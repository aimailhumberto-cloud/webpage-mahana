import { useState, useEffect, useRef, FC } from 'react'
import { Calendar, Users, ChevronRight, Check, CreditCard, Loader2, MapPin, Star, Shield, ArrowLeft, Bed, Sun, Clock, Mail, Phone, Globe, Upload } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useLocation } from 'react-router-dom'

const API = '/api/v1/public'

type RoomType = { tipo: string; categoria: string; capacidad_min: number; capacidad_max: number; total: number; disponibles: number }
type Plan = { id: number; codigo: string; nombre: string; descripcion: string; precio_adulto_noche: number; precio_menor_noche: number; precio_mascota_noche: number; incluye: string[]; horario: string; extras_disponibles: string[]; imagen: string | null }
type RoomAllocation = { tipo: string; adultos: number; menores: number; mascotas: number }

function PayPalButtons({ clientId, monto, descripcion, onSuccess, onError }: {
  clientId: string; monto: number; descripcion: string; onSuccess: (orderId: string) => void; onError: (msg: string) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sdkReady, setSdkReady] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const existing = document.getElementById('paypal-sdk') as HTMLScriptElement | null
    const expectedSrc = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&intent=capture&enable-funding=card`
    
    if (existing) {
      if (existing.src === expectedSrc) {
        setSdkReady(true)
        setLoading(false)
        return
      } else {
        existing.remove()
        if ((window as any).paypal) {
          delete (window as any).paypal
        }
        setSdkReady(false)
        setLoading(true)
      }
    }
    
    const script = document.createElement('script')
    script.id = 'paypal-sdk'
    script.src = expectedSrc
    script.onload = () => { setSdkReady(true); setLoading(false) }
    script.onerror = () => { onError('Error cargando PayPal'); setLoading(false) }
    document.head.appendChild(script)
  }, [clientId])

  useEffect(() => {
    if (!sdkReady || !containerRef.current || !(window as any).paypal) return
    containerRef.current.innerHTML = ''
    ;(window as any).paypal.Buttons({
      style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal', height: 50 },
      createOrder: async () => {
        try {
          const resp = await fetch(`${API}/paypal/create-order`, { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ monto, descripcion }) 
          })
          const data = await resp.json()
          if (data.success && data.data?.orderId) return data.data.orderId
          throw new Error(data.error?.message || 'Error al generar la orden de cobro')
        } catch (err: any) {
          onError(err.message || 'Error al conectar con la pasarela de PayPal')
          throw err
        }
      },
      onApprove: async (data: any) => {
        try {
          const resp = await fetch(`${API}/paypal/capture-order`, { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ orderId: data.orderID }) 
          })
          const result = await resp.json()
          if (result.success && result.data?.status === 'COMPLETED') { 
            onSuccess(data.orderID) 
          } else { 
            throw new Error(result.error?.message || 'La captura del pago no fue completada por PayPal') 
          }
        } catch (err: any) {
          onError(err.message || 'Error al capturar el pago en el servidor')
        }
      },
      onError: (err: any) => {
        console.error('PayPal SDK error:', err)
        onError('Fallo o cancelación en la pasarela de PayPal')
      }
    }).render(containerRef.current)
  }, [sdkReady, monto])

  if (loading) return <div className="flex justify-center py-6"><Loader2 className="w-8 h-8 animate-spin text-turquoise-700" /></div>
  return <div ref={containerRef} />
}

// Room type icon mapping
const roomIcons: Record<string, any> = { 'Familiar': Bed, 'Doble': Bed, 'Estándar': Bed, 'Camping': Sun }
const defaultRoomImages: Record<string, string> = {
  'Familiar': 'https://images.unsplash.com/photo-1590490360182-c72a1b3c73b6?w=400&h=250&fit=crop',
  'Doble': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=250&fit=crop',
  'Estándar': 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&h=250&fit=crop',
  'Camping': 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=250&fit=crop',
}

const translateRoomType = (tipo: string, lang: string) => {
  if (lang === 'en') {
    if (tipo === 'Familiar') return 'Family Bohío';
    if (tipo === 'Doble') return 'Double Bohío';
    if (tipo === 'Estándar') return 'Standard Bohío';
  }
  return tipo;
}

const getPlanName = (codigo: string, defaultName: string, language: string) => {
  if (codigo === 'todo_incluido') {
    return language === 'es' ? 'Todo Incluido / All-Inclusive' : 'All-Inclusive';
  }
  if (codigo === 'mahana_exp') {
    return 'Mahana Experience';
  }
  if (codigo === 'pool_day') {
    return language === 'es' ? 'Pasadía / Pool Day' : 'Pool Day Pass';
  }
  return defaultName;
}


type CartItem = {
  id: string;
  tipo: string;
  plan: Plan;
  adultos: number;
  menores: number;
  mascotas: number;
  subtotal: number;
  impuesto_monto: number;
  monto_total: number;
  deposito_minimo: number;
}

export const BookingWizard: FC = () => {
  const location = useLocation()
  const { language, t } = useLanguage()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [categoria, setCategoria] = useState<'Estadía' | 'Pasadía'>('Estadía')

  useEffect(() => {
    if (location?.state) {
      const state = location.state as { category?: 'Estadía' | 'Pasadía'; planCode?: string }
      if (state.category) {
        setCategoria(state.category)
      }
    }
  }, [location])
  const [adultos, setAdultos] = useState(1)
  const [menores, setMenores] = useState(0)
  const [mascotas, setMascotas] = useState(0)
  const [adultosBuscados, setAdultosBuscados] = useState(1)
  const [menoresBuscados, setMenoresBuscados] = useState(0)
  const [mascotasBuscadas, setMascotasBuscadas] = useState(0)
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([])
  const [paypalConfig, setPaypalConfig] = useState<{ paypal_enabled: boolean; paypal_client_id: string | null; paypal_mode: string }>({ paypal_enabled: false, paypal_client_id: null, paypal_mode: 'sandbox' })
  const [result, setResult] = useState<{ reserva_id?: number; mensaje?: string; grupo_codigo?: string } | null>(null)
  const [tipoFotos, setTipoFotos] = useState<Record<string, string>>({})

  // Multi-room Shopping Cart states
  const [cart, setCart] = useState<CartItem[]>([])

  // Plan fetching per room type
  const [allRoomPlans, setAllRoomPlans] = useState<Record<string, Plan[]>>({})
  const [selectedPlans, setSelectedPlans] = useState<Record<string, Plan>>({})

  // Offline Payment states
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<string>('paypal')
  const [reference, setReference] = useState('')
  const [pagoTipo, setPagoTipo] = useState<'deposito' | 'total'>('deposito')
  const [guest, setGuest] = useState({ nombre: '', apellido: '', email: '', whatsapp: '', nacionalidad: '' })

  useEffect(() => {
    if (!receiptFile) {
      setPreviewUrl(null)
      return
    }
    if (receiptFile.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(receiptFile)
    } else {
      setPreviewUrl(null)
    }
  }, [receiptFile])

  useEffect(() => {
    fetch(`${API}/paypal-config`).then(r => r.json()).then(d => { if (d.success) setPaypalConfig(d.data) })
    fetch(`${API}/tipo-fotos`).then(r => r.json()).then(d => { if (d.success) setTipoFotos(d.data) })
  }, [])

  // Reset cart when search criteria changes (Cart State Cleanup)
  useEffect(() => {
    setCart([])
  }, [checkIn, checkOut, adultos, menores, mascotas, categoria])

  const parseUTCDate = (dateStr: string) => {
    if (!dateStr) return null
    const [year, month, day] = dateStr.split('-').map(Number)
    return new Date(Date.UTC(year, month - 1, day))
  }

  const formatUTCDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Panama' })
  
  const minCheckOut = (() => {
    if (!checkIn) return today
    if (categoria === 'Pasadía') return checkIn
    const d = parseUTCDate(checkIn)
    if (!d) return today
    d.setUTCDate(d.getUTCDate() + 1)
    return formatUTCDate(d)
  })()

  const calcNoches = (cIn: string, cOut: string) => {
    if (!cIn || !cOut) return 0
    const d1 = parseUTCDate(cIn)
    const d2 = parseUTCDate(cOut)
    if (!d1 || !d2) return 0
    const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24))
    return diff >= 0 ? diff : 0
  }

  const noches = calcNoches(checkIn, checkOut)

  const isDateSelectionValid = () => {
    if (!checkIn) return false
    if (checkIn < today) return false
    if (categoria === 'Pasadía') {
      return checkOut === checkIn
    } else {
      if (!checkOut) return false
      return checkOut > checkIn
    }
  }

  const handleCheckInChange = (val: string) => {
    setCheckIn(val)
    if (categoria === 'Pasadía') {
      setCheckOut(val)
    } else {
      if (checkOut && val >= checkOut) {
        setCheckOut('')
      }
    }
  }

  const checkAvailability = async () => {
    setLoading(true); setError('')
    try {
      const resp = await fetch(`${API}/disponibilidad?check_in=${checkIn}&check_out=${checkOut}&categoria=${categoria}`)
      const data = await resp.json()
      if (!data.success) { setError(data.error?.message || 'Error'); return }
      if (data.data.tipos_disponibles.length === 0) {
        setError(language === 'es' ? 'No hay disponibilidad para esas fechas. Prueba con otras fechas.' : 'No availability for these dates. Try other dates.')
        return
      }
      
      setRoomTypes(data.data.tipos_disponibles)
      
      // Save searched values
      setAdultosBuscados(adultos)
      setMenoresBuscados(menores)
      setMascotasBuscadas(mascotas)

      // Fetch plans for all available room types in parallel
      const plansMap: Record<string, Plan[]> = {}
      const defaultPlansMap: Record<string, Plan> = {}
      await Promise.all(data.data.tipos_disponibles.map(async (rt: RoomType) => {
        const pResp = await fetch(`${API}/planes?tipo=${rt.tipo}`)
        const pData = await pResp.json()
        if (pData.success && pData.data.length > 0) {
          plansMap[rt.tipo] = pData.data
          defaultPlansMap[rt.tipo] = pData.data[0]
        }
      }))
      setAllRoomPlans(plansMap)
      setSelectedPlans(defaultPlansMap)
      setStep(2)
    } catch {
      setError(language === 'es' ? 'Error de conexión' : 'Connection error')
    } finally {
      setLoading(false)
    }
  }

  // Backtracking suggested room distribution engine ("El Sugerido")
  const findElSugerido = (
    adults: number,
    minors: number,
    pets: number,
    availableTypes: RoomType[]
  ) => {
    const ROOM_CAPACITIES: Record<string, { min: number; max: number }> = {}
    availableTypes.forEach(rt => {
      ROOM_CAPACITIES[rt.tipo] = { min: rt.capacidad_min, max: rt.capacidad_max }
    })

    function solveDistribution(
      rooms: string[],
      remAdults: number,
      remMinors: number,
      remPets: number
    ): RoomAllocation[] | null {
      const result: RoomAllocation[] = []

      function backtrack(
        idx: number,
        rAdults: number,
        rMinors: number,
        rPets: number
      ): boolean {
        if (idx === rooms.length) {
          return rAdults === 0 && rMinors === 0 && rPets === 0
        }

        const tipo = rooms[idx]
        const cap = ROOM_CAPACITIES[tipo] || { min: 1, max: 4 }

        const minAdults = 1
        const maxAdults = Math.min(rAdults, cap.max)

        for (let a = minAdults; a <= maxAdults; a++) {
          const minMinors = Math.max(0, cap.min - a)
          const maxMinors = Math.min(rMinors, cap.max - a)

          for (let m = minMinors; m <= maxMinors; m++) {
            const maxPets = Math.min(rPets, 2)
            for (let p = 0; p <= maxPets; p++) {
              result.push({ tipo, adultos: a, menores: m, mascotas: p })
              if (backtrack(idx + 1, rAdults - a, rMinors - m, rPets - p)) {
                return true
              }
              result.pop()
            }
          }
        }
        return false
      }

      if (backtrack(0, remAdults, remMinors, remPets)) {
        return result
      }
      return null
    }

    // Sort available room types by max capacity to establish priority weights
    const sortedTypes = [...availableTypes].sort((a, b) => a.capacidad_max - b.capacidad_max)
    const weights: Record<string, number> = {}
    sortedTypes.forEach((rt, index) => {
      weights[rt.tipo] = Math.pow(10, index)
    })

    const typeOrder = sortedTypes.map(rt => rt.tipo)
    const availableMap: Record<string, number> = {}
    
    availableTypes.forEach(rt => {
      availableMap[rt.tipo] = rt.disponibles
    })

    const results: string[][] = []

    function generateCombos(typeIdx: number, currentCombo: string[]) {
      if (typeIdx === typeOrder.length) {
        if (currentCombo.length > 0) results.push([...currentCombo])
        return
      }

      const type = typeOrder[typeIdx]
      const maxQty = Math.min(availableMap[type] || 0, adults)

      for (let qty = 0; qty <= maxQty; qty++) {
        const added = Array(qty).fill(type)
        generateCombos(typeIdx + 1, [...currentCombo, ...added])
      }
    }

    generateCombos(0, [])

    results.sort((a, b) => {
      if (a.length !== b.length) return a.length - b.length
      const wA = a.reduce((sum, r) => sum + (weights[r] || 0), 0)
      const wB = b.reduce((sum, r) => sum + (weights[r] || 0), 0)
      return wA - wB // Ascending order: prioritize smaller capacity rooms first
    })

    for (const combo of results) {
      const allocation = solveDistribution(combo, adults, minors, pets)
      if (allocation) return allocation
    }

    return null
  }

  const aplicarElSugerido = async (sugerencia: RoomAllocation[]) => {
    setLoading(true); setError('')
    try {
      const newCartItems: CartItem[] = []
      
      for (const alloc of sugerencia) {
        const plan = selectedPlans[alloc.tipo] || allRoomPlans[alloc.tipo]?.[0]
        if (!plan) {
          throw new Error(language === 'es' ? `No se encontró un plan de tarifa para el tipo ${alloc.tipo}` : `No rate plan found for type ${alloc.tipo}`)
        }
        
        const resp = await fetch(`${API}/cotizar?plan=${plan.codigo}&adultos=${alloc.adultos}&menores=${alloc.menores}&mascotas=${alloc.mascotas}&check_in=${checkIn}&check_out=${checkOut}`)
        const data = await resp.json()
        if (!data.success) {
          throw new Error(data.error?.message || `Error cotizando habitación sugerida de tipo ${alloc.tipo}`)
        }
        
        newCartItems.push({
          id: `${Date.now()}-${Math.random()}-${alloc.tipo}`,
          tipo: alloc.tipo,
          plan,
          adultos: alloc.adultos,
          menores: alloc.menores,
          mascotas: alloc.mascotas,
          subtotal: data.data.subtotal,
          impuesto_monto: data.data.impuesto_monto,
          monto_total: data.data.monto_total,
          deposito_minimo: data.data.deposito_minimo
        })
      }
      
      setCart(newCartItems)
      setStep(3)
    } catch (e: any) {
      setError(e.message || 'Error aplicando la sugerencia')
    } finally {
      setLoading(false)
    }
  }

  const handleIncrement = async (rt: RoomType) => {
    const currentQty = cart.filter(x => x.tipo === rt.tipo).length
    if (currentQty >= rt.disponibles) return
    
    const plan = selectedPlans[rt.tipo]
    if (!plan) return

    const isFirstRoom = cart.length === 0
    const initAdults = isFirstRoom ? Math.min(adultosBuscados, rt.capacidad_max) : 1
    const initMinors = isFirstRoom ? Math.min(menoresBuscados, Math.max(0, rt.capacidad_max - initAdults)) : 0
    const initPets = isFirstRoom ? mascotasBuscadas : 0

    setLoading(true); setError('')
    try {
      const resp = await fetch(`${API}/cotizar?plan=${plan.codigo}&adultos=${initAdults}&menores=${initMinors}&mascotas=${initPets}&check_in=${checkIn}&check_out=${checkOut}`)
      const data = await resp.json()
      if (!data.success) { setError(data.error?.message || 'Error cotizando'); return }
      
      const newItem: CartItem = {
        id: `${Date.now()}-${Math.random()}`,
        tipo: rt.tipo,
        plan,
        adultos: initAdults,
        menores: initMinors,
        mascotas: initPets,
        subtotal: data.data.subtotal,
        impuesto_monto: data.data.impuesto_monto,
        monto_total: data.data.monto_total,
        deposito_minimo: data.data.deposito_minimo
      }
      setCart(prev => [...prev, newItem])
    } catch {
      setError(language === 'es' ? 'Error cotizando habitación' : 'Error quoting room')
    } finally {
      setLoading(false)
    }
  }

  const handleDecrement = (rt: RoomType) => {
    const idx = [...cart].reverse().findIndex(x => x.tipo === rt.tipo)
    if (idx === -1) return
    const actualIdx = cart.length - 1 - idx
    setCart(prev => prev.filter((_, i) => i !== actualIdx))
  }

  const updateCartItemGuests = async (itemId: string, adults: number, minors: number, pets: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId) {
        return { ...item, adultos: adults, menores: minors, mascotas: pets }
      }
      return item
    }))

    const item = cart.find(x => x.id === itemId)
    if (!item) return
    
    try {
      const resp = await fetch(`${API}/cotizar?plan=${item.plan.codigo}&adultos=${adults}&menores=${minors}&mascotas=${pets}&check_in=${checkIn}&check_out=${checkOut}`)
      const data = await resp.json()
      if (data.success) {
        setCart(prev => prev.map(x => {
          if (x.id === itemId) {
            return {
              ...x,
              subtotal: data.data.subtotal,
              impuesto_monto: data.data.impuesto_monto,
              monto_total: data.data.monto_total,
              deposito_minimo: data.data.deposito_minimo
            }
          }
          return x
        }))
      }
    } catch (err) {
      console.error("Error updating cotizacion dynamically", err)
    }
  }

  const totalSubtotal = cart.reduce((acc, item) => acc + item.subtotal, 0)
  const totalImpuesto = cart.reduce((acc, item) => acc + item.impuesto_monto, 0)
  const totalMontoTotal = cart.reduce((acc, item) => acc + item.monto_total, 0)
  const totalDepositoMinimo = cart.reduce((acc, item) => acc + item.deposito_minimo, 0)

  // Calculations for Step 3 (Guest Allocation Console)
  const assignedAdults = cart.reduce((acc, x) => acc + x.adultos, 0)
  const assignedMinors = cart.reduce((acc, x) => acc + x.menores, 0)
  const assignedPets = cart.reduce((acc, x) => acc + x.mascotas, 0)

  const adultsMatch = assignedAdults === adultosBuscados
  const minorsMatch = assignedMinors === menoresBuscados
  const petsMatch = assignedPets === mascotasBuscadas

  // Check physical capacities for all rooms in cart
  const capacityViolations = cart.map(item => {
    const rt = roomTypes.find(r => r.tipo === item.tipo)
    const capMin = rt ? rt.capacidad_min : 1
    const capMax = rt ? rt.capacidad_max : 4
    const totalGuests = item.adultos + item.menores
    const isTooLow = totalGuests < capMin
    const isTooHigh = totalGuests > capMax
    const isAdultInvalid = item.adultos < 1
    return {
      itemId: item.id,
      tipo: item.tipo,
      isTooLow,
      isTooHigh,
      isAdultInvalid,
      capMin,
      capMax,
      totalGuests
    }
  })

  const hasCapacityViolation = capacityViolations.some(v => v.isTooHigh || v.isAdultInvalid)
  const allMatch = adultsMatch && minorsMatch && petsMatch && !hasCapacityViolation

  const createReservation = async (paypalOrderId: string) => {
    setLoading(true); setError('')
    const totalPagar = pagoTipo === 'total' ? totalMontoTotal : totalDepositoMinimo
    try {
      const resp = await fetch(`${API}/reservas/multi`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cliente: guest.nombre, apellido: guest.apellido, email: guest.email, whatsapp: guest.whatsapp, nacionalidad: guest.nacionalidad,
          check_in: checkIn, check_out: checkOut, metodo_pago: 'paypal', paypal_order_id: paypalOrderId, pago_tipo: pagoTipo,
          monto_pagado: totalPagar,
          rooms: cart.map(item => ({
            tipo_habitacion: item.tipo, plan_codigo: item.plan.codigo,
            adultos: item.adultos, menores: item.menores, mascotas: item.mascotas,
            check_in: checkIn, check_out: checkOut
          }))
        })
      })
      const data = await resp.json()
      if (!data.success) { setError(data.error?.message || 'Error creando reserva'); return }
      setResult(data.data); setStep(6)
    } catch {
      setError(language === 'es' ? 'Error de conexión' : 'Connection error')
    } finally {
      setLoading(false)
    }
  }

  const handleOfflineBooking = async () => {
    setLoading(true); setError('')
    const totalPagar = pagoTipo === 'total' ? totalMontoTotal : totalDepositoMinimo
    try {
      const payload = {
        cliente: guest.nombre,
        apellido: guest.apellido,
        email: guest.email,
        whatsapp: guest.whatsapp,
        nacionalidad: guest.nacionalidad,
        check_in: checkIn,
        check_out: checkOut,
        pago_tipo: pagoTipo,
        monto_pagado: totalPagar,
        metodo_pago: paymentMethod,
        referencia: reference,
        rooms: cart.map(item => ({
          tipo_habitacion: item.tipo,
          plan_codigo: item.plan.codigo,
          adultos: item.adultos,
          menores: item.menores,
          mascotas: item.mascotas,
          check_in: checkIn,
          check_out: checkOut
        }))
      }

      const formData = new FormData()
      if (receiptFile) {
        formData.append('comprobante', receiptFile)
      }
      formData.append('datos', JSON.stringify(payload))
      formData.append('notas', `Comprobante de ${paymentMethod.toUpperCase()} (Ref: ${reference}) subido por el huésped durante la reserva online.`)

      const resp = await fetch(`${API}/reservas/multi`, {
        method: 'POST',
        body: formData
      })
      const data = await resp.json()
      if (!data.success) {
        setError(data.error?.message || 'Error creando reserva')
        return
      }

      setResult(data.data)
      setStep(6)
    } catch {
      setError(language === 'es' ? 'Error de conexión al procesar la reserva' : 'Connection error while processing booking')
    } finally {
      setLoading(false)
    }
  }

  const isGuestValid = !!(guest.nombre && guest.apellido && guest.email && guest.email.includes('@'))
  const montoPagar = pagoTipo === 'total' ? totalMontoTotal : totalDepositoMinimo
  const planImage = cart[0]?.plan.imagen || (cart[0]?.tipo ? (tipoFotos[cart[0].tipo] || defaultRoomImages[cart[0].tipo]) : '') || defaultRoomImages['Familiar']

  const stepLabels = [
    t('wizard.steps.step1'),
    t('wizard.steps.step2'),
    t('wizard.steps.step3'),
    t('wizard.steps.step4'),
    t('wizard.steps.step5'),
    t('wizard.steps.step6')
  ]

  return (
    <div className="min-h-screen py-8" style={{ background: 'linear-gradient(135deg, #fefbf3 0%, #fdf4e3 30%, #fef9ef 60%, #fffcf5 100%)' }}>
      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          {stepLabels.map((label, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                step > i + 1 ? 'bg-turquoise-700 text-white shadow-md' : step === i + 1 ? 'bg-turquoise-900 text-white shadow-lg ring-4 ring-turquoise-100' : 'bg-sand-200 text-sand-300'
              }`}>{step > i + 1 ? <Check className="w-4 h-4" /> : i + 1}</div>
              <span className={`hidden sm:block ${step === i + 1 ? 'text-turquoise-950 font-bold' : 'text-sand-300'}`}>{label}</span>
            </div>
          ))}
        </div>
        <div className="h-2 bg-sand-200 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-turquoise-400 to-turquoise-700" style={{ width: `${((step - 0.5) / 6) * 100}%` }} />
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-3xl mx-auto px-4">
        {error && (
          <div className="mb-5 p-4 rounded-2xl border border-red-200 text-red-700 text-sm flex items-start gap-3 bg-red-50/50">
            <span className="text-red-500 font-bold text-base mt-0.5">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: Dates & Experience */}
        {step === 1 && (
          <div className="bg-white rounded-3xl shadow-glass p-6 sm:p-8 border border-sand-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-turquoise-100 flex items-center justify-center"><Calendar className="w-5 h-5 text-turquoise-900" /></div>
              <div>
                <h2 className="text-xl font-bold text-turquoise-950">{t('wizard.step1_title')}</h2>
                <p className="text-xs sm:text-sm text-turquoise-900/60">{t('wizard.step1_subtitle')}</p>
              </div>
            </div>

            {/* Experience Toggles */}
            <div className="flex bg-sand-100 p-1.5 rounded-2xl border border-sand-200 mb-6 gap-2">
              <button
                type="button"
                onClick={() => setCategoria('Estadía')}
                className={`flex-1 py-3 text-xs sm:text-sm font-semibold rounded-xl transition flex items-center justify-center gap-2 ${
                  categoria === 'Estadía'
                    ? 'bg-turquoise-700 text-white shadow-md'
                    : 'text-turquoise-900 hover:bg-sand-200/30'
                }`}
              >
                <Bed className="w-4 h-4" />
                <span>{t('wizard.category_stay')}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setCategoria('Pasadía');
                  if (checkIn) setCheckOut(checkIn);
                }}
                className={`flex-1 py-3 text-xs sm:text-sm font-semibold rounded-xl transition flex items-center justify-center gap-2 ${
                  categoria === 'Pasadía'
                    ? 'bg-turquoise-700 text-white shadow-md'
                    : 'text-turquoise-900 hover:bg-sand-200/30'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>{t('wizard.category_day')}</span>
              </button>
            </div>

            {/* Dates */}
            <div className={`grid grid-cols-1 ${categoria === 'Pasadía' ? '' : 'sm:grid-cols-2'} gap-4 mb-5`}>
              <div>
                <label className="block text-xs font-bold text-turquoise-900 uppercase tracking-wide mb-1.5">
                  {categoria === 'Pasadía' ? t('wizard.visit_date') : t('wizard.checkin')}
                </label>
                <input type="date" min={today} value={checkIn} onChange={e => handleCheckInChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sand-200 bg-sand-50/20 focus:ring-2 focus:ring-turquoise-400 focus:border-transparent focus:bg-white transition text-turquoise-900 text-sm font-medium" />
              </div>
              {categoria !== 'Pasadía' && (
                <div>
                  <label className="block text-xs font-bold text-turquoise-900 uppercase tracking-wide mb-1.5">
                    {t('wizard.checkout')}
                  </label>
                  <input type="date" min={minCheckOut} value={checkOut} onChange={e => setCheckOut(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-sand-200 bg-sand-50/20 focus:ring-2 focus:ring-turquoise-400 focus:border-transparent focus:bg-white transition text-turquoise-900 text-sm font-medium" />
                </div>
              )}
            </div>

            {categoria === 'Pasadía' && checkIn && (
              <p className="text-xs sm:text-sm text-turquoise-900/80 font-medium mb-4 flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-turquoise-700" />
                {language === 'es' 
                  ? 'Pasadía (1 día de acceso completo de 9:00 AM a 5:00 PM)' 
                  : 'Day Pass (1 full day of access from 9:00 AM to 5:00 PM)'}
              </p>
            )}
            {categoria !== 'Pasadía' && noches > 0 && (
              <p className="text-xs sm:text-sm text-turquoise-900/80 font-medium mb-4 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-turquoise-700" />
                {noches} {noches > 1 ? t('common.nights') : (language === 'es' ? 'noche' : 'night')}
              </p>
            )}

            {/* Guests */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-turquoise-900 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{t('common.adults')}</span>
                </label>
                <select value={adultos} onChange={e => setAdultos(+e.target.value)} 
                  className="w-full px-2 py-2.5 sm:px-3 sm:py-3 rounded-xl border border-sand-200 bg-sand-50/20 focus:ring-2 focus:ring-turquoise-400 text-turquoise-900 text-[11px] sm:text-sm font-medium">
                  {Array.from({ length: 30 }, (_, i) => i + 1).map(n => 
                    <option key={n} value={n}>{n} {n > 1 ? t('common.adults').toLowerCase() : (language === 'es' ? 'adulto' : 'adult')}</option>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-turquoise-900 uppercase tracking-wide mb-1.5">
                  {t('common.minors')}
                </label>
                <select value={menores} onChange={e => setMenores(+e.target.value)} 
                  className="w-full px-2 py-2.5 sm:px-3 sm:py-3 rounded-xl border border-sand-200 bg-sand-50/20 focus:ring-2 focus:ring-turquoise-400 text-turquoise-900 text-[11px] sm:text-sm font-medium">
                  {Array.from({ length: 16 }, (_, i) => i).map(n => 
                    <option key={n} value={n}>{n} {n === 1 ? (language === 'es' ? 'menor' : 'child') : t('common.minors').toLowerCase()}</option>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-turquoise-900 uppercase tracking-wide mb-1.5">
                  {t('common.pets')}
                </label>
                <select value={mascotas} onChange={e => setMascotas(+e.target.value)} 
                  className="w-full px-2 py-2.5 sm:px-3 sm:py-3 rounded-xl border border-sand-200 bg-sand-50/20 focus:ring-2 focus:ring-turquoise-400 text-turquoise-900 text-[11px] sm:text-sm font-medium">
                  {Array.from({ length: 11 }, (_, i) => i).map(n => 
                    <option key={n} value={n}>{n} {n === 1 ? (language === 'es' ? 'mascota' : 'pet') : t('common.pets').toLowerCase()}</option>
                  )}
                </select>
              </div>
            </div>

            <button disabled={!isDateSelectionValid() || loading} onClick={checkAvailability}
              className="w-full py-4 text-white font-bold rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-40 flex items-center justify-center gap-2 text-base sm:text-lg bg-gradient-to-r from-turquoise-700 to-turquoise-900">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>{t('wizard.btn_check')}</span><ChevronRight className="w-5 h-5" /></>}
            </button>

            <div className="flex items-center justify-center gap-6 mt-6 text-[10px] sm:text-xs text-turquoise-900/50">
              <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-turquoise-700" /> {language === 'es' ? 'Pago seguro' : 'Secure payment'}</span>
              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-turquoise-700" /> {language === 'es' ? 'Confirmación inmediata' : 'Instant confirmation'}</span>
              <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-turquoise-700" /> {language === 'es' ? 'Sin cargos ocultos' : 'No hidden fees'}</span>
            </div>
          </div>
        )}

        {/* STEP 2: Room Selection */}
        {step === 2 && (() => {
          const sugerencia = findElSugerido(adultosBuscados, menoresBuscados, mascotasBuscadas, roomTypes)
          return (
            <div className="space-y-6 animate-fade-in">
              {/* Category Toggle Tabs (visible in Step 2) */}
              <div className="flex bg-sand-100 p-1.5 rounded-2xl border border-sand-200 gap-2">
                <button
                  type="button"
                  onClick={() => { setCategoria('Estadía'); setCart([]); setStep(1); }}
                  className={`flex-1 py-3 text-xs sm:text-sm font-semibold rounded-xl transition flex items-center justify-center gap-2 ${
                    categoria === 'Estadía'
                      ? 'bg-turquoise-700 text-white shadow-md'
                      : 'text-turquoise-900 hover:bg-sand-200/30'
                  }`}
                >
                  <Bed className="w-4 h-4" />
                  <span>{t('wizard.category_stay')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setCategoria('Pasadía'); if (checkIn) setCheckOut(checkIn); setCart([]); setStep(1); }}
                  className={`flex-1 py-3 text-xs sm:text-sm font-semibold rounded-xl transition flex items-center justify-center gap-2 ${
                    categoria === 'Pasadía'
                      ? 'bg-turquoise-700 text-white shadow-md'
                      : 'text-turquoise-900 hover:bg-sand-200/30'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  <span>{t('wizard.category_day')}</span>
                </button>
              </div>
              {cart.length > 0 && (
                <div className="bg-gradient-to-br from-sand-100 to-sand-200/40 border border-sand-300 rounded-3xl p-5 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-turquoise-950 text-sm sm:text-base flex items-center gap-2">
                      <span>🛒 {language === 'es' ? 'Tu Carrito de Habitaciones' : 'Your Room Cart'}</span>
                      <span className="bg-turquoise-700 text-white text-xs px-2.5 py-0.5 rounded-full font-bold">{cart.length}</span>
                    </h3>
                    <button
                      onClick={() => setCart([])}
                      className="text-xs text-red-600 hover:text-red-800 font-semibold transition"
                    >
                      {language === 'es' ? 'Vaciar carrito' : 'Empty cart'}
                    </button>
                  </div>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded-2xl border border-sand-100 text-xs sm:text-sm shadow-xs">
                        <div>
                          <p className="font-bold text-turquoise-950 flex items-center gap-1.5">
                            <Bed className="w-4 h-4 text-turquoise-700" />
                            <span>{translateRoomType(item.tipo, language)}</span>
                          </p>
                          <p className="text-[10px] sm:text-xs text-turquoise-900/60 mt-1">
                            {getPlanName(item.plan.codigo, item.plan.nombre, language)} · {item.adultos} Ad{item.menores > 0 ? ` · ${item.menores} Mn` : ''}{item.mascotas > 0 ? ` · ${item.mascotas} Mc` : ''}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-turquoise-900">${item.monto_total.toFixed(2)}</span>
                          <button
                            onClick={() => setCart(prev => prev.filter(x => x.id !== item.id))}
                            className="w-7 h-7 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition"
                            title={language === 'es' ? 'Eliminar de mi carrito' : 'Remove from my cart'}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between mt-5 pt-4 border-t border-sand-300 gap-4">
                    <div>
                      <span className="text-[10px] sm:text-xs text-turquoise-900/50 block font-medium">
                        {categoria === 'Pasadía' ? (language === 'es' ? 'Total de tu pasadía' : 'Total of your day pass') : (language === 'es' ? 'Total de tu estadía' : 'Total of your stay')}
                      </span>
                      <p className="text-xl sm:text-2xl font-black text-turquoise-950">${totalMontoTotal.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => setStep(3)}
                      className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-turquoise-700 to-turquoise-900 text-white font-bold rounded-xl text-xs sm:text-sm hover:shadow-lg transition flex items-center justify-center gap-2"
                    >
                      <span>{language === 'es' ? 'Siguiente: Distribuir Huéspedes' : 'Next: Allocate Guests'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ✨ El Sugerido Recommendation Banner */}
              {sugerencia && (
                <div className="bg-gradient-to-r from-sand-100 to-turquoise-50/30 border-2 border-turquoise-400 rounded-3xl p-6 shadow-md mb-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-turquoise-100/30 rounded-full -mr-8 -mt-8 pointer-events-none" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="inline-flex items-center gap-1 bg-turquoise-100 text-turquoise-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
                        {t('wizard.sugerido_badge')}
                      </span>
                      <h3 className="font-extrabold text-turquoise-950 text-base sm:text-lg">
                        {t('wizard.sugerido_title')}
                      </h3>
                      <p className="text-xs sm:text-sm text-turquoise-900/80 mt-1 leading-relaxed">
                        {t('wizard.sugerido_desc')}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {sugerencia.map((s, idx) => (
                          <span key={idx} className="bg-white border border-sand-200 text-turquoise-950 text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xs">
                            🚪 <b>{translateRoomType(s.tipo, language)}</b> ({s.adultos} Ad{s.menores > 0 ? `, ${s.menores} Mn` : ''}{s.mascotas > 0 ? `, ${s.mascotas} Mc` : ''})
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => aplicarElSugerido(sugerencia)}
                      disabled={loading}
                      className="bg-turquoise-700 hover:bg-turquoise-900 text-white font-bold px-5 py-3 rounded-2xl transition shadow-md hover:shadow-lg text-xs sm:text-sm shrink-0 flex items-center justify-center gap-2 self-start sm:self-center"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>{t('wizard.sugerido_btn')}</span>}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-3xl shadow-glass p-6 sm:p-8 border border-sand-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-turquoise-100 flex items-center justify-center"><Bed className="w-5 h-5 text-turquoise-900" /></div>
                  <div><h2 className="text-lg sm:text-xl font-bold text-turquoise-950">{language === 'es' ? 'Elige una habitación para agregar' : 'Choose a room to add'}</h2></div>
                </div>
                <p className="text-xs sm:text-sm text-turquoise-900/60 mb-6 ml-[52px]">
                  {categoria === 'Pasadía' ? t('wizard.category_day') : `${noches} ${noches > 1 ? t('common.nights').toLowerCase() : (language === 'es' ? 'noche' : 'night')}`} · {adultosBuscados} {adultosBuscados > 1 ? t('common.adults').toLowerCase() : (language === 'es' ? 'adulto' : 'adult')}{menoresBuscados > 0 ? ` · ${menoresBuscados} ${menoresBuscados > 1 ? t('common.minors').toLowerCase() : (language === 'es' ? 'menor' : 'child')}` : ''}{mascotasBuscadas > 0 ? ` · ${mascotasBuscadas} ${mascotasBuscadas > 1 ? t('common.pets').toLowerCase() : (language === 'es' ? 'mascota' : 'pet')}` : ''}
                </p>
                <div className="space-y-4">
                  {roomTypes.map(rt => {
                    const Icon = roomIcons[rt.tipo] || Bed
                    const img = tipoFotos[rt.tipo] || defaultRoomImages[rt.tipo] || defaultRoomImages['Familiar']
                    const currentQty = cart.filter(x => x.tipo === rt.tipo).length

                    return (
                      <div key={rt.tipo}
                        className="w-full rounded-2xl border border-sand-200 hover:border-turquoise-300 hover:shadow-md transition-all duration-200 text-left overflow-hidden bg-white">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-44 h-32 sm:h-auto overflow-hidden shrink-0">
                            <img src={img} alt={rt.tipo} className="w-full h-full object-cover" loading="lazy" />
                          </div>
                          <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
                            <div>
                              <h3 className="font-bold text-turquoise-950 text-base sm:text-lg flex items-center gap-2">
                                <Icon className="w-5 h-5 text-turquoise-700" />
                                {translateRoomType(rt.tipo, language)}
                              </h3>
                              <p className="text-xs sm:text-sm text-turquoise-900/60 mt-1">
                                {rt.capacidad_min}–{rt.capacidad_max} {language === 'es' ? 'huéspedes' : 'guests'}
                              </p>
                              <p className="text-[10px] sm:text-xs text-emerald-600 mt-1 font-semibold">
                                {rt.disponibles} {language === 'es' ? 'disponible' : 'available'}{rt.disponibles > 1 ? 's' : ''}
                              </p>
                            </div>

                            {/* Plan Selection */}
                            <div className="mt-3">
                              <label className="block text-[10px] font-bold text-turquoise-900/60 uppercase tracking-wide mb-1">
                                {language === 'es' ? 'Plan de Tarifa' : 'Rate Plan'}
                              </label>
                              <select
                                value={selectedPlans[rt.tipo]?.codigo || ''}
                                onChange={(e) => {
                                  const plan = allRoomPlans[rt.tipo]?.find(p => p.codigo === e.target.value)
                                  if (plan) {
                                    setSelectedPlans(prev => ({ ...prev, [rt.tipo]: plan }))
                                  }
                                }}
                                className="w-full px-3 py-2 text-xs sm:text-sm border border-sand-200 rounded-xl bg-white text-turquoise-950 focus:ring-2 focus:ring-turquoise-400 font-medium"
                              >
                                {allRoomPlans[rt.tipo]?.map(p => (
                                  <option key={p.codigo} value={p.codigo}>
                                    {getPlanName(p.codigo, p.nombre, language)} (${p.precio_adulto_noche}/{categoria === 'Pasadía' ? (language === 'es' ? 'persona' : 'person') : (language === 'es' ? 'noche' : 'night')})
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Sleek quantity selector */}
                            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-sand-200">
                              <button
                                onClick={() => handleDecrement(rt)}
                                disabled={currentQty === 0 || loading}
                                className="w-8 h-8 rounded-full border border-sand-200 hover:border-turquoise-700 flex items-center justify-center font-bold text-sand-300 hover:text-turquoise-900 disabled:opacity-30 transition"
                              >
                                -
                              </button>
                              <span className="font-bold text-turquoise-950 text-sm w-6 text-center">
                                {currentQty}
                              </span>
                              <button
                                onClick={() => handleIncrement(rt)}
                                disabled={currentQty >= rt.disponibles || loading}
                                className="w-8 h-8 rounded-full border border-sand-200 hover:border-turquoise-700 flex items-center justify-center font-bold text-sand-300 hover:text-turquoise-900 disabled:opacity-30 transition"
                              >
                                +
                              </button>
                              <span className="text-[10px] sm:text-xs text-turquoise-900/40 ml-auto">
                                ({rt.disponibles} {language === 'es' ? 'disponibles' : 'available'})
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <button onClick={() => setStep(1)} className="mt-5 text-xs sm:text-sm text-turquoise-700 hover:text-turquoise-950 font-bold flex items-center gap-1">
                  <ArrowLeft className="w-4 h-4" /> {language === 'es' ? 'Cambiar fechas' : 'Change dates'}
                </button>
              </div>
            </div>
          )
        })()}

        {/* STEP 3: Guest Allocation */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in pb-32">
            <div className="bg-white rounded-3xl shadow-glass p-6 sm:p-8 border border-sand-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-turquoise-100 flex items-center justify-center"><Users className="w-5 h-5 text-turquoise-900" /></div>
                <div>
                  <h2 className="text-xl font-bold text-turquoise-950">{t('wizard.step3_title')}</h2>
                  <p className="text-xs sm:text-sm text-turquoise-900/60">{t('wizard.step3_desc')}</p>
                </div>
              </div>
              
              <div className="space-y-4 mt-6">
                {cart.map((item, idx) => {
                  const rt = roomTypes.find(r => r.tipo === item.tipo)
                  const capMin = rt ? rt.capacidad_min : 1
                  const capMax = rt ? rt.capacidad_max : 4
                  const totalGuests = item.adultos + item.menores
                  const isTooLow = totalGuests < capMin
                  const isTooHigh = totalGuests > capMax
                  const isAdultInvalid = item.adultos < 1
                  const hasWarn = isTooLow || isTooHigh || isAdultInvalid

                  return (
                    <div key={item.id} className="p-5 rounded-2xl border border-sand-200 bg-sand-50/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-turquoise-950 text-xs sm:text-sm">
                            {language === 'es' ? 'Habitación' : 'Room'} {idx + 1}: {translateRoomType(item.tipo, language)}
                          </span>
                          <span className="text-[10px] bg-turquoise-100 text-turquoise-900 font-bold px-2 py-0.5 rounded-full">
                            {getPlanName(item.plan.codigo, item.plan.nombre, language)}
                          </span>
                          {hasWarn && (
                            <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                              {t('wizard.warn_capacity')}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] sm:text-xs text-turquoise-900/50">
                          {language === 'es' ? 'Capacidad física' : 'Physical capacity'}: {capMin} - {capMax} {language === 'es' ? 'huéspedes' : 'guests'}.
                        </p>
                        {isAdultInvalid && <p className="text-[10px] sm:text-xs text-red-500 font-semibold">{t('wizard.warn_min_adults')}</p>}
                        {isTooLow && <p className="text-[10px] sm:text-xs text-red-500 font-semibold">{t('wizard.warn_min_cap')} ({capMin}).</p>}
                        {isTooHigh && <p className="text-[10px] sm:text-xs text-red-500 font-semibold">{t('wizard.warn_max_cap')} ({capMax}).</p>}
                      </div>

                      {/* Guest Adjusters */}
                      <div className="grid grid-cols-2 gap-x-2 gap-y-3 sm:flex sm:items-center sm:gap-4 bg-white p-3 rounded-xl border border-sand-200 w-full md:w-auto">
                        {/* Adults */}
                        <div className="flex flex-col items-center">
                          <span className="text-[9px] font-bold text-turquoise-900/50 uppercase mb-1">{t('common.adults')}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCartItemGuests(item.id, Math.max(0, item.adultos - 1), item.menores, item.mascotas)}
                              className="w-6 h-6 rounded-full border border-sand-200 hover:border-turquoise-700 flex items-center justify-center text-xs font-bold text-turquoise-900"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold text-turquoise-950 w-4 text-center">{item.adultos}</span>
                            <button
                              onClick={() => updateCartItemGuests(item.id, Math.min(30, item.adultos + 1), item.menores, item.mascotas)}
                              className="w-6 h-6 rounded-full border border-sand-200 hover:border-turquoise-700 flex items-center justify-center text-xs font-bold text-turquoise-900"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Minors */}
                        <div className="flex flex-col items-center">
                          <span className="text-[9px] font-bold text-turquoise-900/50 uppercase mb-1">{t('common.minors')}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCartItemGuests(item.id, item.adultos, Math.max(0, item.menores - 1), item.mascotas)}
                              className="w-6 h-6 rounded-full border border-sand-200 hover:border-turquoise-700 flex items-center justify-center text-xs font-bold text-turquoise-900"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold text-turquoise-950 w-4 text-center">{item.menores}</span>
                            <button
                              onClick={() => updateCartItemGuests(item.id, item.adultos, Math.min(15, item.menores + 1), item.mascotas)}
                              className="w-6 h-6 rounded-full border border-sand-200 hover:border-turquoise-700 flex items-center justify-center text-xs font-bold text-turquoise-900"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Pets */}
                        <div className="flex flex-col items-center">
                          <span className="text-[9px] font-bold text-turquoise-900/50 uppercase mb-1">{t('common.pets')}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCartItemGuests(item.id, item.adultos, item.menores, Math.max(0, item.mascotas - 1))}
                              className="w-6 h-6 rounded-full border border-sand-200 hover:border-turquoise-700 flex items-center justify-center text-xs font-bold text-turquoise-900"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold text-turquoise-950 w-4 text-center">{item.mascotas}</span>
                            <button
                              onClick={() => updateCartItemGuests(item.id, item.adultos, item.menores, Math.min(10, item.mascotas + 1))}
                              className="w-6 h-6 rounded-full border border-sand-200 hover:border-turquoise-700 flex items-center justify-center text-xs font-bold text-turquoise-900"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Room Price */}
                        <div className="text-right pl-0 sm:pl-2 sm:border-l sm:border-sand-200 flex flex-col justify-center">
                          <span className="text-[9px] text-turquoise-900/50 block font-semibold">{language === 'es' ? 'Hab. Total' : 'Room Total'}</span>
                          <span className="font-bold text-turquoise-900 text-sm">${item.monto_total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 flex justify-between items-center">
                <button onClick={() => setStep(2)} className="text-xs sm:text-sm text-turquoise-700 hover:text-turquoise-950 font-bold flex items-center gap-1">
                  <ArrowLeft className="w-4 h-4" /> {language === 'es' ? 'Volver a habitaciones' : 'Back to rooms'}
                </button>
              </div>
            </div>

            {/* Floating Glassmorphic Validation Panel */}
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-sand-300 shadow-2xl py-5 px-6">
              <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
                <div className="flex-1 w-full space-y-3">
                  {/* Status Stats */}
                  <div className="grid grid-cols-4 gap-4 text-center md:text-left">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-turquoise-900/50 block">{t('common.adults')}</span>
                      <p className={`text-sm sm:text-base font-black ${adultsMatch ? 'text-emerald-600' : 'text-turquoise-900'}`}>
                        {assignedAdults} / {adultosBuscados}
                      </p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-turquoise-900/50 block">{t('common.minors')}</span>
                      <p className={`text-sm sm:text-base font-black ${minorsMatch ? 'text-emerald-600' : 'text-turquoise-900'}`}>
                        {assignedMinors} / {menoresBuscados}
                      </p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-turquoise-900/50 block">{t('common.pets')}</span>
                      <p className={`text-sm sm:text-base font-black ${petsMatch ? 'text-emerald-600' : 'text-turquoise-900'}`}>
                        {assignedPets} / {mascotasBuscadas}
                      </p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-turquoise-900/50 block">{language === 'es' ? 'Cap. Max' : 'Max Cap'}</span>
                      <p className="text-sm sm:text-base font-black text-turquoise-950">
                        {cart.reduce((acc, item) => {
                          const rt = roomTypes.find(r => r.tipo === item.tipo)
                          return acc + (rt ? rt.capacidad_max : 0)
                        }, 0)}
                      </p>
                    </div>
                  </div>

                  {/* Status Message */}
                  <div className={`p-3 rounded-2xl text-xs font-semibold ${allMatch ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
                    {allMatch ? (
                      <p>{t('wizard.perfect_allocation')}</p>
                    ) : (
                      <div className="space-y-1">
                        <p className="font-bold">{t('wizard.missing_allocation')}</p>
                        <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                          {assignedAdults < adultosBuscados && <li>{language === 'es' ? `Faltan asignar ${adultosBuscados - assignedAdults} adulto(s) de tu búsqueda.` : `${adultosBuscados - assignedAdults} adult(s) missing from search.`}</li>}
                          {assignedAdults > adultosBuscados && <li>{language === 'es' ? `Sobran ${assignedAdults - adultosBuscados} adulto(s) asignado(s).` : `${assignedAdults - adultosBuscados} extra adult(s) assigned.`}</li>}
                          {assignedMinors < menoresBuscados && <li>{language === 'es' ? `Faltan asignar ${menoresBuscados - assignedMinors} menor(es) de tu búsqueda.` : `${menoresBuscados - assignedMinors} child(ren) missing from search.`}</li>}
                          {assignedMinors > menoresBuscados && <li>{language === 'es' ? `Sobran ${assignedMinors - menoresBuscados} menor(es) asignado(s).` : `${assignedMinors - menoresBuscados} extra child(ren) assigned.`}</li>}
                          {assignedPets < mascotasBuscadas && <li>{language === 'es' ? `Faltan asignar ${mascotasBuscadas - assignedPets} mascota(s) de tu búsqueda.` : `${mascotasBuscadas - assignedPets} pet(s) missing from search.`}</li>}
                          {assignedPets > mascotasBuscadas && <li>{language === 'es' ? `Sobran ${assignedPets - mascotasBuscadas} mascota(s) asignada(s).` : `${assignedPets - mascotasBuscadas} extra pet(s) assigned.`}</li>}
                          {hasCapacityViolation && <li>{language === 'es' ? 'Revisa las advertencias de capacidad física en cada habitación.' : 'Check physical capacity warnings in each room.'}</li>}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-auto flex flex-col items-center sm:items-end gap-1 shrink-0">
                  <span className="text-[10px] text-turquoise-900/50 block font-bold uppercase">{t('common.total')}</span>
                  <p className="text-xl sm:text-2xl font-black text-turquoise-950 mb-2">${totalMontoTotal.toFixed(2)}</p>
                  <button
                    disabled={!allMatch}
                    onClick={() => setStep(4)}
                    className="w-full md:w-auto px-6 py-4 bg-gradient-to-r from-turquoise-700 to-turquoise-900 text-white font-bold rounded-2xl text-sm sm:text-base hover:shadow-xl disabled:opacity-40 disabled:pointer-events-none transition flex items-center justify-center gap-2"
                  >
                    <span>{t('wizard.btn_guest_info')}</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Summary & Guest Info */}
        {step === 4 && cart.length > 0 && (
          <div className="space-y-5 animate-fade-in">
            {/* Summary Card */}
            <div className="bg-white rounded-3xl shadow-glass overflow-hidden border border-sand-200">
              {planImage && (
                <div className="h-48 sm:h-56 overflow-hidden relative">
                  <img src={planImage} alt="Casa Mahana" className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-turquoise-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 text-white">
                    <h3 className="text-lg sm:text-xl font-bold font-serif">{t('wizard.summary_title')}</h3>
                    <p className="text-white/80 text-xs sm:text-sm">
                      {cart.length} {categoria === 'Pasadía' ? (language === 'es' ? 'Bohío(s)' : 'Bohío(s)') : (language === 'es' ? 'Habitación(es)' : 'Room(s)')} · {categoria === 'Pasadía' ? t('wizard.category_day') : `${noches} ${noches > 1 ? t('common.nights').toLowerCase() : (language === 'es' ? 'noche' : 'night')}`}
                    </p>
                  </div>
                </div>
              )}
              <div className="p-6">
                <h2 className="text-base sm:text-lg font-bold text-turquoise-950 mb-4">
                  {categoria === 'Pasadía' ? (language === 'es' ? 'Bohíos Seleccionados' : 'Selected Bohíos') : (language === 'es' ? 'Habitaciones Seleccionadas' : 'Selected Rooms')}
                </h2>
                <div className="space-y-3 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-start bg-sand-50/20 p-4 rounded-2xl border border-sand-200 text-xs">
                      <div>
                        <p className="font-bold text-turquoise-950 flex items-center gap-1.5">
                          <Bed className="w-3.5 h-3.5 text-turquoise-700" />
                          <span>{translateRoomType(item.tipo, language)}</span>
                        </p>
                        <p className="text-turquoise-900/60 mt-1">{getPlanName(item.plan.codigo, item.plan.nombre, language)}</p>
                        <p className="text-turquoise-900/40 mt-1">{item.adultos} Ad{item.menores > 0 ? ` · ${item.menores} Mn` : ''}{item.mascotas > 0 ? ` · ${item.mascotas} Mc` : ''}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-turquoise-900 text-xs sm:text-sm block">${item.monto_total.toFixed(2)}</span>
                        <span className="text-[9px] text-turquoise-900/50 uppercase font-semibold">{categoria === 'Pasadía' ? (language === 'es' ? 'Total Bohío' : 'Bohío Total') : (language === 'es' ? 'Total habitación' : 'Room Total')}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="text-base sm:text-lg font-bold text-turquoise-950 mb-4">{language === 'es' ? 'Resumen financiero' : 'Financial Summary'}</h2>
                <div className="rounded-2xl p-4 space-y-2.5 text-xs sm:text-sm bg-gradient-to-br from-sand-100 to-sand-200/40 border border-sand-300">
                  <div className="flex justify-between">
                    <span className="text-turquoise-900/60 flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-turquoise-700" /> 
                      {categoria === 'Pasadía' ? t('wizard.visit_date') : (language === 'es' ? 'Fechas' : 'Dates')}
                    </span>
                    <span className="font-bold text-turquoise-950">{categoria === 'Pasadía' ? checkIn : `${checkIn} — ${checkOut}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-turquoise-900/60 flex items-center gap-1.5 font-medium">
                      <Users className="w-3.5 h-3.5 text-turquoise-700" /> 
                      {categoria === 'Pasadía' ? 'Bohíos' : t('wizard.steps.step2')}
                    </span>
                    <span className="font-bold text-turquoise-950">{cart.length}</span>
                  </div>
                  <hr className="border-sand-300" />
                  <div className="flex justify-between items-center"><span className="text-turquoise-900/60 font-medium">Subtotal</span> <span className="font-bold text-turquoise-950">${totalSubtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-turquoise-900/60 font-medium">{language === 'es' ? 'Impuesto (7%)' : 'Tax (7%)'}</span><span className="font-bold text-turquoise-950">${totalImpuesto.toFixed(2)}</span></div>
                  <div className="flex justify-between text-base sm:text-lg font-black text-turquoise-950 pt-1 border-t border-sand-300">
                    <span>Total</span>
                    <span>${totalMontoTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-5">
                  <label className="block text-xs font-bold text-turquoise-900/60 uppercase tracking-wide mb-2">
                    {language === 'es' ? 'Modalidad de pago' : 'Payment Option'}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setPagoTipo('deposito')}
                      className={`p-4 rounded-2xl border-2 text-center transition-all ${pagoTipo === 'deposito' ? 'border-turquoise-700 bg-turquoise-50/20 shadow-md' : 'border-sand-200 hover:border-sand-300'}`}>
                      <p className="text-lg sm:text-xl font-black text-turquoise-900">${totalDepositoMinimo.toFixed(2)}</p>
                      <p className="text-[10px] sm:text-xs text-turquoise-900/60 font-semibold mt-0.5">{t('common.deposit')}</p>
                    </button>
                    <button onClick={() => setPagoTipo('total')}
                      className={`p-4 rounded-2xl border-2 text-center transition-all ${pagoTipo === 'total' ? 'border-turquoise-700 bg-turquoise-50/20 shadow-md' : 'border-sand-200 hover:border-sand-300'}`}>
                      <p className="text-lg sm:text-xl font-black text-turquoise-900">${totalMontoTotal.toFixed(2)}</p>
                      <p className="text-[10px] sm:text-xs text-turquoise-900/60 font-semibold mt-0.5">{t('common.full_payment')}</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Guest Info Form */}
            <div className="bg-white rounded-3xl shadow-glass p-6 sm:p-8 border border-sand-200">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-2xl bg-turquoise-100 flex items-center justify-center"><Users className="w-5 h-5 text-turquoise-900" /></div>
                <h2 className="text-base sm:text-lg font-bold text-turquoise-950">{t('wizard.guest_details')}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-turquoise-900/60 uppercase tracking-wide mb-1.5">{t('common.name')} *</label>
                  <input type="text" value={guest.nombre} onChange={e => setGuest({ ...guest, nombre: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-sand-200 bg-sand-50/20 focus:ring-2 focus:ring-turquoise-400 focus:bg-white transition text-sm text-turquoise-950 font-medium" placeholder={language === 'es' ? 'Ej: Juan' : 'e.g. John'} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-turquoise-900/60 uppercase tracking-wide mb-1.5">{t('common.lastname')} *</label>
                  <input type="text" value={guest.apellido} onChange={e => setGuest({ ...guest, apellido: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-sand-200 bg-sand-50/20 focus:ring-2 focus:ring-turquoise-400 focus:bg-white transition text-sm text-turquoise-950 font-medium" placeholder={language === 'es' ? 'Ej: Pérez' : 'e.g. Doe'} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-turquoise-900/60 uppercase tracking-wide mb-1.5"><Mail className="w-3 h-3 inline mr-1" />{t('common.email')} *</label>
                  <input type="email" value={guest.email} onChange={e => setGuest({ ...guest, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-sand-200 bg-sand-50/20 focus:ring-2 focus:ring-turquoise-400 focus:bg-white transition text-sm text-turquoise-950 font-medium" placeholder="john@email.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-turquoise-900/60 uppercase tracking-wide mb-1.5"><Phone className="w-3 h-3 inline mr-1" />{t('common.phone')}</label>
                  <input type="tel" value={guest.whatsapp} onChange={e => setGuest({ ...guest, whatsapp: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-sand-200 bg-sand-50/20 focus:ring-2 focus:ring-turquoise-400 focus:bg-white transition text-sm text-turquoise-950 font-medium" placeholder="+507 6XXX-XXXX" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-turquoise-900/60 uppercase tracking-wide mb-1.5"><Globe className="w-3 h-3 inline mr-1" />{t('common.nationality')}</label>
                  <input type="text" value={guest.nacionalidad} onChange={e => setGuest({ ...guest, nacionalidad: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-sand-200 bg-sand-50/20 focus:ring-2 focus:ring-turquoise-400 focus:bg-white transition text-sm text-turquoise-950 font-medium" placeholder={language === 'es' ? 'Ej: Panameño' : 'e.g. Panamanian'} />
                </div>
              </div>
              <button disabled={!isGuestValid} onClick={() => setStep(5)}
                className="w-full mt-6 py-4 text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-40 flex items-center justify-center gap-2 text-base sm:text-lg bg-gradient-to-r from-turquoise-700 to-turquoise-900">
                <CreditCard className="w-5 h-5" /> <span>{t('wizard.btn_pago')}</span>
              </button>
            </div>
            <button onClick={() => setStep(3)} className="text-xs sm:text-sm text-turquoise-700 hover:text-turquoise-950 font-bold flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> {language === 'es' ? 'Volver a distribución' : 'Back to distribution'}
            </button>
          </div>
        )}

        {/* STEP 5: Payment Method & Receipt Upload */}
        {step === 5 && cart.length > 0 && (
          <div className="bg-white rounded-3xl shadow-glass overflow-hidden border border-sand-200 animate-fade-in">
            {planImage && (
              <div className="h-32 overflow-hidden relative">
                <img src={planImage} alt="Casa Mahana" className="w-full h-full object-cover brightness-[0.65]" loading="lazy" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <p className="text-xs sm:text-sm opacity-80">{pagoTipo === 'total' ? t('common.full_payment') : t('common.deposit')}</p>
                    <p className="text-3xl sm:text-4xl font-black">${montoPagar.toFixed(2)} <span className="text-sm font-semibold opacity-70">USD</span></p>
                  </div>
                </div>
              </div>
            )}
            <div className="p-6 sm:p-8">
              {pagoTipo === 'deposito' && (
                <p className="text-center text-[10px] sm:text-xs text-turquoise-900/60 mb-5 font-semibold">
                  {t('common.remaining_balance')}: <b>${(totalMontoTotal - montoPagar).toFixed(2)}</b> ({t('common.pay_at_checkin')})
                </p>
              )}

              {/* Segmented Tab Control */}
              <div className="flex flex-col sm:flex-row bg-sand-100 p-1.5 rounded-2xl border border-sand-200 mb-6 gap-2">
                <button
                  type="button"
                  onClick={() => { setPaymentMethod('paypal'); setError(''); }}
                  className={`w-full sm:flex-1 py-3 text-xs sm:text-sm font-semibold rounded-xl transition flex items-center justify-center gap-2 ${
                    paymentMethod === 'paypal'
                      ? 'bg-turquoise-700 text-white shadow-md'
                      : 'text-turquoise-900 hover:bg-sand-200/30'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{language === 'es' ? 'Pago Seguro Online' : 'Secure Online Payment'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setPaymentMethod('transferencia'); setError(''); }}
                  className={`w-full sm:flex-1 py-3 text-xs sm:text-sm font-semibold rounded-xl transition flex items-center justify-center gap-2 ${
                    paymentMethod !== 'paypal'
                      ? 'bg-turquoise-700 text-white shadow-md'
                      : 'text-turquoise-900 hover:bg-sand-200/30'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  <span>{language === 'es' ? 'Transferencia / Yappy / Cupón' : 'Transfer / Yappy / Coupon'}</span>
                </button>
              </div>

              {/* PayPal Payment */}
              {paymentMethod === 'paypal' ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-5 justify-center">
                    <Shield className="w-5 h-5 text-emerald-500" />
                    <span className="text-xs sm:text-sm text-turquoise-900/50 font-medium">{t('wizard.paypal_shield')}</span>
                  </div>
                  {paypalConfig.paypal_enabled && paypalConfig.paypal_client_id ? (
                    <PayPalButtons clientId={paypalConfig.paypal_client_id}
                      monto={montoPagar} descripcion={`Casa Mahana - Group Booking (${categoria === 'Pasadía' ? t('wizard.category_day') : `${noches} nights`})`}
                      onSuccess={(orderId) => createReservation(orderId)}
                      onError={(msg) => setError(msg)} />
                  ) : (
                    <div className="text-center py-8 text-turquoise-900/60">
                      <p className="font-semibold">{language === 'es' ? 'Sistema de pago online no disponible temporalmente' : 'Online payment system temporarily unavailable'}</p>
                      <p className="text-xs sm:text-sm mt-2">{language === 'es' ? 'Contacta directamente al hotel para confirmar tu reserva' : 'Contact the hotel directly to confirm your booking'}</p>
                      <div className="flex gap-3 justify-center mt-5">
                        <a href="https://wa.me/50760000000" className="px-5 py-2.5 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition flex items-center gap-2 text-xs sm:text-sm shadow-sm">
                          <Phone className="w-4 h-4" /> WhatsApp
                        </a>
                        <a href="mailto:recepcion@casamahana.com" className="px-5 py-2.5 bg-sand-200 text-turquoise-950 border border-sand-300 rounded-xl font-bold hover:bg-sand-300 transition flex items-center gap-2 text-xs sm:text-sm shadow-sm">
                          <Mail className="w-4 h-4" /> Email
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Offline Payments */
                <div className="space-y-4 text-left">
                  {/* Account Type Toggle */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('transferencia')}
                      className={`py-2 px-3 text-[10px] sm:text-xs font-semibold rounded-xl border transition ${
                        paymentMethod === 'transferencia'
                          ? 'border-turquoise-700 bg-turquoise-50/20 text-turquoise-950 font-bold'
                          : 'border-sand-200 hover:border-sand-300 text-turquoise-900/60 bg-white'
                      }`}
                    >
                      {t('common.bank_transfer')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('yappy')}
                      className={`py-2 px-3 text-[10px] sm:text-xs font-semibold rounded-xl border transition ${
                        paymentMethod === 'yappy'
                          ? 'border-turquoise-700 bg-turquoise-50/20 text-turquoise-950 font-bold'
                          : 'border-sand-200 hover:border-sand-300 text-turquoise-900/60 bg-white'
                      }`}
                    >
                      {t('common.yappy_general')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cuponera_oferta_simple')}
                      className={`py-2 px-3 text-[10px] sm:text-xs font-semibold rounded-xl border transition ${
                        paymentMethod === 'cuponera_oferta_simple'
                          ? 'border-turquoise-700 bg-turquoise-50/20 text-turquoise-950 font-bold'
                          : 'border-sand-200 hover:border-sand-300 text-turquoise-900/60 bg-white'
                      }`}
                    >
                      {t('common.oferta_simple')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cuponera_pahoy')}
                      className={`py-2 px-3 text-[10px] sm:text-xs font-semibold rounded-xl border transition ${
                        paymentMethod === 'cuponera_pahoy'
                          ? 'border-turquoise-700 bg-turquoise-50/20 text-turquoise-950 font-bold'
                          : 'border-sand-200 hover:border-sand-300 text-turquoise-900/60 bg-white'
                      }`}
                    >
                      {t('common.pahoy')}
                    </button>
                  </div>

                  {/* Payment Instructions Cards */}
                  {paymentMethod === 'transferencia' && (
                    <div className="bg-sand-50/40 border border-sand-200 rounded-2xl p-4 text-xs sm:text-sm mb-5 space-y-2">
                      <p className="font-bold text-turquoise-950 text-sm sm:text-base mb-1">{t('wizard.bank_title')}</p>
                      <div className="grid grid-cols-2 gap-y-2 text-turquoise-900 text-[11px] sm:text-xs font-medium">
                        <div><span className="text-turquoise-950/40 text-[9px] block uppercase font-bold">{t('wizard.bank_name')}</span><strong>Banco General</strong></div>
                        <div><span className="text-turquoise-950/40 text-[9px] block uppercase font-bold">{t('wizard.bank_account_type')}</span><strong>{language === 'es' ? 'Cuenta Corriente' : 'Checking Account'}</strong></div>
                        <div><span className="text-turquoise-950/40 text-[9px] block uppercase font-bold">{t('wizard.bank_owner')}</span><strong>Casa Mahana S.A.</strong></div>
                        <div><span className="text-turquoise-950/40 text-[9px] block uppercase font-bold">{t('wizard.bank_number')}</span><strong>03-72-01-123456-7</strong></div>
                      </div>
                      <p className="text-[10px] text-turquoise-700/80 italic pt-2 border-t border-sand-200">{t('wizard.bank_notes')}</p>
                    </div>
                  )}

                  {paymentMethod === 'yappy' && (
                    <div className="bg-sand-50/40 border border-sand-200 rounded-2xl p-4 text-xs sm:text-sm mb-5 space-y-2">
                      <p className="font-bold text-turquoise-950 text-sm sm:text-base mb-1">{t('wizard.yappy_title')}</p>
                      <div className="grid grid-cols-2 gap-y-2 text-turquoise-900 text-[11px] sm:text-xs font-medium">
                        <div><span className="text-turquoise-950/40 text-[9px] block uppercase font-bold">{t('wizard.yappy_dir')}</span><strong>@casamahana</strong></div>
                        <div><span className="text-turquoise-950/40 text-[9px] block uppercase font-bold">{t('wizard.bank_name')}</span><strong>Banco General</strong></div>
                      </div>
                      <p className="text-[10px] text-turquoise-700/80 italic pt-2 border-t border-sand-200">{t('wizard.yappy_notes')}</p>
                    </div>
                  )}

                  {paymentMethod === 'cuponera_oferta_simple' && (
                    <div className="bg-sand-50/40 border border-sand-200 rounded-2xl p-4 text-xs sm:text-sm mb-5 space-y-2">
                      <button type="button" onClick={() => setPaymentMethod('cuponera_oferta_simple')} className="font-bold text-turquoise-950 text-sm sm:text-base mb-1 text-left w-full">{language === 'es' ? 'Cupón de Oferta Simple' : 'Oferta Simple Coupon'}</button>
                      <p className="text-[11px] sm:text-xs text-turquoise-900/80 leading-relaxed font-semibold">
                        {language === 'es' 
                          ? 'Por favor, ingrese el código o número de cupón en el campo de abajo y adjunte el archivo o captura del cupón (QR visible).' 
                          : 'Please enter the coupon number or code in the reference field below and upload a screenshot or document of the coupon (visible QR).'}
                      </p>
                      <p className="text-[10px] text-turquoise-700/80 italic pt-2 border-t border-sand-200">
                        {language === 'es' ? 'El personal de Casa Mahana validará el cupón y confirmará su reserva.' : 'Casa Mahana staff will validate the coupon and confirm your booking.'}
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'cuponera_pahoy' && (
                    <div className="bg-sand-50/40 border border-sand-200 rounded-2xl p-4 text-xs sm:text-sm mb-5 space-y-2">
                      <button type="button" onClick={() => setPaymentMethod('cuponera_pahoy')} className="font-bold text-turquoise-950 text-sm sm:text-base mb-1 text-left w-full">{language === 'es' ? 'Cupón de PaHoy' : 'PaHoy Coupon'}</button>
                      <p className="text-[11px] sm:text-xs text-turquoise-900/80 leading-relaxed font-semibold">
                        {language === 'es' 
                          ? 'Por favor, ingrese el código o número de cupón en el campo de abajo y adjunte el archivo o captura del cupón (QR visible).' 
                          : 'Please enter the coupon number or code in the reference field below and upload a screenshot or document of the coupon (visible QR).'}
                      </p>
                      <p className="text-[10px] text-turquoise-700/80 italic pt-2 border-t border-sand-200">
                        {language === 'es' ? 'El personal de Casa Mahana validará el cupón y confirmará su reserva.' : 'Casa Mahana staff will validate the coupon and confirm your booking.'}
                      </p>
                    </div>
                  )}

                  {/* Reference input */}
                  <div className="mb-4">
                    <label htmlFor="offline-reference-input" className="block text-xs font-bold text-turquoise-900/60 uppercase tracking-wide mb-1.5">
                      {t('common.reference')} *
                    </label>
                    <input
                      id="offline-reference-input"
                      type="text"
                      value={reference}
                      onChange={e => setReference(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-sand-200 focus:ring-2 focus:ring-turquoise-400 focus:border-transparent transition text-turquoise-950 bg-sand-50/20 text-xs sm:text-sm font-semibold"
                      placeholder={language === 'es' ? 'Ej: 123456' : 'e.g. 123456'}
                    />
                  </div>

                  {/* Sleek drag & drop zone */}
                  <div className="mb-5">
                    <label className="block text-xs font-bold text-turquoise-900/60 uppercase tracking-wide mb-1.5">
                      📸 {t('common.upload_receipt')} *
                    </label>
                    <div
                      onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }}
                      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }}
                      onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setDragActive(false);
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          const file = e.dataTransfer.files[0];
                          const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
                          if (allowed.includes(file.type)) {
                            setReceiptFile(file);
                          } else {
                            alert(language === 'es' ? 'Solo se permiten imágenes JPG, PNG, WebP o archivos PDF.' : 'Only JPG, PNG, WebP or PDF files are allowed.');
                          }
                        }
                      }}
                      className={`border-2 border-dashed rounded-2xl p-5 text-center transition relative overflow-hidden flex flex-col items-center justify-center min-h-[140px] bg-sand-50/10 ${
                        dragActive ? 'border-turquoise-700 bg-turquoise-50/20' : 'border-sand-300 hover:border-turquoise-500'
                      }`}
                    >
                      <input
                        type="file"
                        id="public-receipt-input"
                        accept=".jpg,.jpeg,.png,.webp,.pdf"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
                            if (allowed.includes(file.type)) {
                              setReceiptFile(file);
                            } else {
                              alert(language === 'es' ? 'Solo se permiten imágenes JPG, PNG, WebP o archivos PDF.' : 'Only JPG, PNG, WebP or PDF files are allowed.');
                              e.target.value = '';
                            }
                          }
                        }}
                      />
                      {!receiptFile ? (
                        <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-turquoise-700">
                            <Upload className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-turquoise-900 hover:underline">
                              {t('common.select_file').split(' o ')[0]}
                            </span>
                            <span className="text-xs sm:text-sm text-turquoise-900/60">
                              {language === 'es' ? ' o arrastra aquí' : ' or drag here'}
                            </span>
                          </div>
                          <p className="text-[10px] sm:text-xs text-turquoise-900/40 font-semibold">{t('common.drop_info')}</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center w-full space-y-3 z-20">
                          {previewUrl ? (
                            <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-sand-200 bg-white shadow-sm">
                              <img src={previewUrl} alt="Comprobante" className="w-full h-full object-cover" loading="lazy" />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-white border border-sand-200 flex items-center justify-center text-turquoise-900 shadow-sm font-bold text-xs uppercase">
                              {receiptFile.name.split('.').pop()}
                            </div>
                          )}
                          <div className="text-center">
                            <p className="text-xs sm:text-sm font-bold text-turquoise-950 truncate max-w-xs">{receiptFile.name}</p>
                            <p className="text-[10px] sm:text-xs text-turquoise-900/40 font-semibold">{(receiptFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setReceiptFile(null); }}
                            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-[10px] sm:text-xs font-bold transition z-30 relative"
                          >
                            {t('common.remove_file')}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    disabled={loading || !reference || !receiptFile}
                    onClick={handleOfflineBooking}
                    className="w-full py-4 text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-40 flex items-center justify-center gap-2 text-base sm:text-lg bg-gradient-to-r from-turquoise-700 to-turquoise-900"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>{t('wizard.btn_confirm_offline')}</span><Check className="w-5 h-5" /></>}
                  </button>
                </div>
              )}

              <button onClick={() => setStep(4)} className="mt-5 text-xs sm:text-sm text-turquoise-700 hover:text-turquoise-950 font-bold flex items-center gap-1 mx-auto">
                <ArrowLeft className="w-4 h-4" /> {language === 'es' ? 'Volver al resumen' : 'Back to summary'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: Confirmation Screen */}
        {step === 6 && result && (
          <div className="bg-white rounded-3xl shadow-glass p-8 sm:p-10 border-2 border-emerald-500/20 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 bg-gradient-to-br from-emerald-100 to-emerald-200">
              <Check className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-emerald-800 mb-2">{t('wizard.confirmation_title')}</h2>
            <p className="text-sm text-turquoise-900/60 mb-2">{language === 'es' ? '¡Tu solicitud de reserva ha sido enviada!' : 'Your booking request has been submitted!'}</p>
            
            {paymentMethod !== 'paypal' && (
              <p className="text-[10px] sm:text-xs text-turquoise-950 bg-sand-100 py-2 px-4 rounded-xl inline-flex items-center gap-1.5 mx-auto mb-4 border border-sand-300 font-semibold">
                <span>{t('wizard.confirmation_status_offline')}</span>
              </p>
            )}
            
            <p className="text-xs sm:text-sm text-turquoise-900/60 mb-6">{result.mensaje}</p>
            <div className="rounded-2xl p-5 inline-block bg-gradient-to-br from-emerald-50 to-emerald-100/30 border border-emerald-500/10">
              <p className="text-[9px] sm:text-xs text-turquoise-900/50 uppercase tracking-wider font-bold mb-1">{t('wizard.confirmation_ref')}</p>
              <p className="text-2xl sm:text-3xl font-black text-emerald-700">#{result.grupo_codigo || result.reserva_id}</p>
            </div>
            <div className="mt-8 space-y-2.5 text-xs sm:text-sm text-turquoise-900/50 font-medium">
              <p className="flex items-center justify-center gap-2"><MapPin className="w-4 h-4 text-turquoise-700" /> Casa Mahana, Chame, Panamá</p>
              <p className="flex items-center justify-center gap-2"><Mail className="w-4 h-4 text-turquoise-700" /> {t('wizard.confirmation_details').includes('correo') ? `Confirmación enviada a ${guest.email}` : `Confirmation sent to ${guest.email}`}</p>
              <p className="flex items-center justify-center gap-2"><Clock className="w-4 h-4 text-turquoise-700" /> {language === 'es' ? 'Nuestro equipo revisará tu reserva en las próximas horas' : 'Our team will review your booking shortly'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

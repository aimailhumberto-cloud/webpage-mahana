import json
import math

def generate_svg():
    # Load calculations from JSON
    with open("subdivision_results.json", "r") as f:
        data = json.load(f)
        
    vertices = data['vertices_original']
    lote_a_pts = data['lote_a_pts']
    lote_b_pts = data['lote_b_pts']
    varilla_x = data['varilla_x']
    varilla_y = data['varilla_y']
    d_front = data['d_front']
    dist_pa_to_y = data['dist_pa_to_y']
    
    # 1. Bounding box calculation
    eastings = [v['E'] for v in vertices]
    northings = [v['N'] for v in vertices]
    
    min_e, max_e = min(eastings), max(eastings)
    min_n, max_n = min(northings), max(northings)
    
    w_m = max_e - min_e
    h_m = max_n - min_n
    
    # SVG size and padding
    svg_w, svg_h = 900, 800
    padding = 100
    
    # Scale calculation
    scale_x = (svg_w - 2 * padding) / w_m
    scale_y = (svg_h - 2 * padding) / h_m
    scale = min(scale_x, scale_y)
    
    # Center the plot in SVG
    offset_x = padding + (svg_w - 2 * padding - w_m * scale) / 2
    offset_y = padding + (svg_h - 2 * padding - h_m * scale) / 2
    
    def to_svg(coord):
        # coord is (E, N)
        e, n = coord[0], coord[1]
        x = offset_x + (e - min_e) * scale
        y = svg_h - (offset_y + (n - min_n) * scale) # flip Y because SVG goes down and UTM goes up
        return x, y

    # Scaled coordinates
    svg_vertices = [to_svg((v['E'], v['N'])) for v in vertices]
    svg_a = [to_svg((p['E'], p['N'])) for p in lote_a_pts]
    svg_b = [to_svg((p['E'], p['N'])) for p in lote_b_pts]
    svg_x = to_svg((varilla_x['E'], varilla_x['N']))
    svg_y = to_svg((varilla_y['E'], varilla_y['N']))
    
    # Format points for SVG polygon path
    path_a = " ".join([f"{x},{y}" for x, y in svg_a])
    path_b = " ".join([f"{x},{y}" for x, y in svg_b])
    
    # Create beautiful SVG content
    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {svg_w} {svg_h}" width="100%" height="100%" style="background-color: #0f172a; font-family: 'Outfit', sans-serif;">
  <defs>
    <!-- Gradients -->
    <linearGradient id="gradLoteA" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#047857" stop-opacity="0.05" />
    </linearGradient>
    <linearGradient id="gradLoteB" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0.05" />
    </linearGradient>
    
    <!-- Shadow filters for premium glow effect -->
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="pinGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Grid Background -->
  <g stroke="#334155" stroke-width="0.5" opacity="0.3">
    {"".join([f'<line x1="{i}" y1="0" x2="{i}" y2="{svg_h}" />' for i in range(0, svg_w, 50)])}
    {"".join([f'<line x1="0" y1="{j}" x2="{svg_w}" y2="{j}" />' for j in range(0, svg_h, 50)])}
  </g>

  <!-- Title & Info -->
  <text x="40" y="50" fill="#f8fafc" font-size="22" font-weight="700" letter-spacing="1">PROPUESTA DE SUBDIVISIÓN 50 / 50</text>
  <text x="40" y="75" fill="#94a3b8" font-size="14">Ubicación: Panamá | Área Total: {data['total_area']:.2f} m²</text>

  <!-- Lot Polygons -->
  <!-- Lote A (Izquierda - Cliente) -->
  <polygon points="{path_a}" fill="url(#gradLoteA)" stroke="#10b981" stroke-width="2.5" style="transition: all 0.3s;" />
  <!-- Lote B (Derecha - Comprador) -->
  <polygon points="{path_b}" fill="url(#gradLoteB)" stroke="#3b82f6" stroke-width="2.5" style="transition: all 0.3s;" />

  <!-- Dividing Perpendicular Line -->
  <line x1="{svg_x[0]}" y1="{svg_x[1]}" x2="{svg_y[0]}" y2="{svg_y[1]}" stroke="#f59e0b" stroke-width="3" stroke-dasharray="8 6" filter="url(#glow)" />

  <!-- Boundary Vertices (P1 to P7) -->
  """
    
    # Add vertex markers
    for idx, (x, y) in enumerate(svg_vertices):
        pt_num = idx + 1
        # Place label intelligently around the vertex
        dx_label, dy_label = 15, -15
        if pt_num == 7: dx_label, dy_label = -20, 20
        elif pt_num == 1: dx_label, dy_label = 15, 20
        elif pt_num == 2: dx_label, dy_label = -18, -10
        elif pt_num == 3: dx_label, dy_label = 15, 20
        elif pt_num == 4: dx_label, dy_label = 15, -15
        elif pt_num == 5: dx_label, dy_label = 10, -20
        elif pt_num == 6: dx_label, dy_label = -20, -15
        
        svg_content += f"""
  <circle cx="{x}" cy="{y}" r="6" fill="#f8fafc" stroke="#1e293b" stroke-width="2" />
  <text x="{x + dx_label}" y="{y + dy_label}" fill="#cbd5e1" font-size="14" font-weight="700">P{pt_num}</text>
  """

    # Add Pin X (Front Varilla)
    svg_content += f"""
  <!-- Varilla Frente X -->
  <g filter="url(#pinGlow)">
    <circle cx="{svg_x[0]}" cy="{svg_x[1]}" r="8" fill="#f59e0b" stroke="#f8fafc" stroke-width="2" />
    <circle cx="{svg_x[0]}" cy="{svg_x[1]}" r="3" fill="#f8fafc" />
  </g>
  <text x="{svg_x[0] - 80}" y="{svg_x[1] + 30}" fill="#f59e0b" font-size="13" font-weight="700">VARILLA FRENTE (X)</text>
  <text x="{svg_x[0] - 80}" y="{svg_x[1] + 45}" fill="#94a3b8" font-size="11">A {d_front:.2f}m de P7</text>
  
  <!-- Dimension Line P7 to X -->
  <path d="M {svg_vertices[6][0]} {svg_vertices[6][1] + 12} L {svg_x[0]} {svg_x[1] + 12}" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 3" />
  <text x="{(svg_vertices[6][0] + svg_x[0])/2}" y="{ (svg_vertices[6][1] + svg_x[1])/2 + 25 }" fill="#f59e0b" font-size="12" font-weight="700" text-anchor="middle">{d_front:.2f} m</text>
  
  <!-- Dimension Line X to P1 -->
  <text x="{(svg_x[0] + svg_vertices[0][0])/2}" y="{ (svg_x[1] + svg_vertices[0][1])/2 + 25 }" fill="#cbd5e1" font-size="11" text-anchor="middle">{data['len_7_1'] - d_front:.2f} m</text>
  """

    # Add Pin Y (Back Varilla)
    svg_content += f"""
  <!-- Varilla Fondo Y -->
  <g filter="url(#pinGlow)">
    <circle cx="{svg_y[0]}" cy="{svg_y[1]}" r="8" fill="#f59e0b" stroke="#f8fafc" stroke-width="2" />
    <circle cx="{svg_y[0]}" cy="{svg_y[1]}" r="3" fill="#f8fafc" />
  </g>
  <text x="{svg_y[0] - 30}" y="{svg_y[1] - 30}" fill="#f59e0b" font-size="13" font-weight="700">VARILLA FONDO (Y)</text>
  <text x="{svg_y[0] - 30}" y="{svg_y[1] - 15}" fill="#94a3b8" font-size="11">A {dist_pa_to_y:.2f}m de P4</text>
  
  <!-- Dimension Line P4 to Y -->
  <path d="M {svg_vertices[3][0]} {svg_vertices[3][1] - 12} L {svg_y[0]} {svg_y[1] - 12}" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 3" />
  <text x="{(svg_vertices[3][0] + svg_y[0])/2}" y="{ (svg_vertices[3][1] + svg_y[1])/2 - 20 }" fill="#f59e0b" font-size="12" font-weight="700" text-anchor="middle">{dist_pa_to_y:.2f} m</text>
  """

    # Center Fence height annotation
    svg_content += f"""
  <!-- Linea central annotacion -->
  <g transform="translate({(svg_x[0] + svg_y[0])/2 + 15}, {(svg_x[1] + svg_y[1])/2})">
    <text x="0" y="0" fill="#f59e0b" font-size="13" font-weight="700" transform="rotate({math.degrees(math.atan2(svg_y[1]-svg_x[1], svg_y[0]-svg_x[0]))})">LÍNEA DIVISORIA: {data['len_divisoria']:.2f} m</text>
  </g>

  <!-- Lot Areas labels inside polygons -->
  <!-- Lote A (Left) -->
  <g transform="translate({(svg_vertices[6][0] + svg_vertices[5][0] + svg_x[0] + svg_y[0])/4}, {(svg_vertices[6][1] + svg_vertices[5][1] + svg_x[1] + svg_y[1])/4})">
    <rect x="-90" y="-30" width="180" height="60" rx="10" fill="#0f172a" fill-opacity="0.85" stroke="#10b981" stroke-width="1.5" />
    <text x="0" y="-5" fill="#10b981" font-size="16" font-weight="700" text-anchor="middle">LOTE A (CLIENTE)</text>
    <text x="0" y="15" fill="#f8fafc" font-size="14" font-weight="700" text-anchor="middle">{data['area_a']:.2f} m²</text>
  </g>
  
  <!-- Lote B (Right) -->
  <!-- We approximate the center of Lote B by taking average of P1, P2, P3, P4, X, Y -->
  <g transform="translate({(svg_vertices[0][0] + svg_vertices[2][0] + svg_vertices[3][0] + svg_x[0] + svg_y[0])/5}, {(svg_vertices[0][1] + svg_vertices[2][1] + svg_vertices[3][1] + svg_x[1] + svg_y[1])/5 - 20})">
    <rect x="-90" y="-30" width="180" height="60" rx="10" fill="#0f172a" fill-opacity="0.85" stroke="#3b82f6" stroke-width="1.5" />
    <text x="0" y="-5" fill="#3b82f6" font-size="16" font-weight="700" text-anchor="middle">LOTE B (COMPRADOR)</text>
    <text x="0" y="15" fill="#f8fafc" font-size="14" font-weight="700" text-anchor="middle">{data['area_b']:.2f} m²</text>
  </g>

  <!-- Legend -->
  <g transform="translate(680, 50)">
    <!-- Glass panel for legend -->
    <rect x="0" y="0" width="180" height="150" rx="12" fill="#1e293b" fill-opacity="0.9" stroke="#334155" stroke-width="1" />
    
    <text x="15" y="25" fill="#f8fafc" font-size="13" font-weight="700">REFERENCIA</text>
    
    <rect x="15" y="45" width="15" height="15" rx="3" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1.5" />
    <text x="40" y="57" fill="#cbd5e1" font-size="12">Lote A (Izquierdo)</text>
    
    <rect x="15" y="70" width="15" height="15" rx="3" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="1.5" />
    <text x="40" y="82" fill="#cbd5e1" font-size="12">Lote B (Derecho)</text>
    
    <line x1="15" y1="105" x2="30" y2="105" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 3" />
    <text x="40" y="109" fill="#cbd5e1" font-size="12">Divisoria Perpendicular</text>
    
    <circle cx="22" cy="130" r="5" fill="#f59e0b" stroke="#f8fafc" stroke-width="1" />
    <text x="40" y="134" fill="#cbd5e1" font-size="12">Pines (Varillas)</text>
  </g>

  <!-- Compass Rose -->
  <g transform="translate(810, 710)">
    <circle cx="0" cy="0" r="25" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
    <!-- North Arrow -->
    <polygon points="0,-22 6,-4 0,-8 -6,-4" fill="#ef4444" />
    <!-- South Arrow -->
    <polygon points="0,22 6,4 0,8 -6,4" fill="#94a3b8" />
    <text x="-4" y="-26" fill="#ef4444" font-size="10" font-weight="900">N</text>
  </g>
</svg>
"""
    
    with open("subdivision_map.svg", "w", encoding='utf-8') as f:
        f.write(svg_content)
    print("SVG Map successfully generated as subdivision_map.svg")

if __name__ == '__main__':
    generate_svg()

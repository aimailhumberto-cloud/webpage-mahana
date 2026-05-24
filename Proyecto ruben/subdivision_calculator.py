import math
import json

def bearing_to_angle(bearing_str):
    # Format: N23° 44'50"E or S60° 20'05"E etc.
    # Returns angle in radians from positive X-axis (East is 0, North is pi/2)
    direction = bearing_str[0]
    quadrant = bearing_str[-1]
    
    # Extract degrees, minutes, seconds
    content = bearing_str[1:-1].replace('°', ' ').replace("'", ' ').replace('"', ' ').strip()
    parts = [float(x) for x in content.split()]
    deg = parts[0]
    min_val = parts[1] if len(parts) > 1 else 0.0
    sec_val = parts[2] if len(parts) > 2 else 0.0
    
    decimal_degrees = deg + min_val / 60.0 + sec_val / 3600.0
    
    # Convert to azimuth (degrees from North, clockwise)
    if direction == 'N':
        if quadrant == 'E':
            azimuth = decimal_degrees
        elif quadrant == 'W':
            azimuth = 360.0 - decimal_degrees
        else:
            raise ValueError(f"Invalid quadrant {quadrant}")
    elif direction == 'S':
        if quadrant == 'E':
            azimuth = 180.0 - decimal_degrees
        elif quadrant == 'W':
            azimuth = 180.0 + decimal_degrees
        else:
            raise ValueError(f"Invalid quadrant {quadrant}")
    else:
        raise ValueError(f"Invalid direction {direction}")
        
    # Convert azimuth to math angle (radians, East is 0, counter-clockwise)
    math_deg = 90.0 - azimuth
    return math.radians(math_deg)

def traverse(start_pt, distance, bearing_str):
    angle = bearing_to_angle(bearing_str)
    dx = distance * math.cos(angle)
    dy = distance * math.sin(angle)
    return (start_pt[0] + dx, start_pt[1] + dy)

# 1. Define control points from WGS-84 coordinates
# P7 = (560090.057, 819871.638)
# P1 = (560129.634, 819848.750)
# P4 = (560192.200, 819922.346)

P7 = (560090.057, 819871.638)
P1 = (560129.634, 819848.750)
P4 = (560192.200, 819922.346)

# 2. Reconstruct vertices using traverses
# 1 -> 2: 33.01, N23° 44' 50" E
P2 = traverse(P1, 33.01, "N23° 44' 50\" E")
# 2 -> 3: 30.16, S60° 20' 05" E
P3 = traverse(P2, 30.16, "S60° 20' 05\" E")
# 3 -> 4: 62.70, N21° 35' 00" E (Check closeness to P4)
P4_calc = traverse(P3, 62.70, "N21° 35' 00\" E")

# 4 -> 5: 62.40, N77° 06' 59" W
P5 = traverse(P4, 62.40, "N77° 06' 59\" W")
# 5 -> 6: 3.63, N80° 04' 39" W
P6 = traverse(P5, 3.63, "N80° 04' 39\" W")
# 6 -> 7: 75.37, S30° 02' 29" W (Check closeness to P7)
P7_calc = traverse(P6, 75.37, "S30° 02' 29\" W")

# Vertices list in counter-clockwise order: 7 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7
# (Wait, let's verify orientation. 7 is bottom-left, 1 is bottom-mid, 2 is inside, 3 is bottom-right, 4 is top-right, 5/6 is top-left.
# The order 7 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 is counter-clockwise.)
vertices = [P7, P1, P2, P3, P4, P5, P6]

def polygon_area(pts):
    # Shoelace formula
    n = len(pts)
    area = 0.0
    for i in range(n):
        j = (i + 1) % n
        area += pts[i][0] * pts[j][1] - pts[j][0] * pts[i][1]
    return abs(area) / 2.0

total_area = polygon_area(vertices)
print(f"Total Area of Polygon: {total_area:.4f} m2")

# 3. Setup Dividing Line Perpendicular to 7-1
# Line 7-1 vector:
v_7_1 = (P1[0] - P7[0], P1[1] - P7[1])
len_7_1 = math.hypot(v_7_1[0], v_7_1[1])
u = (v_7_1[0]/len_7_1, v_7_1[1]/len_7_1) # unit vector along 7-1

# Unit perpendicular vector w pointing "inside" the lot (towards North/East)
# v_7_1 goes roughly East (dE > 0) and South (dN < 0).
# u = (0.86568, -0.50063)
# Perpendicular pointing North/East: w = (0.50063, 0.86568)
w = (-u[1], u[0]) # perpendicular vector (counter-clockwise 90 deg rotation of u)
# u = (u_x, u_y). CCW rotation: (-u_y, u_x) = (-(-0.50063), 0.86568) = (0.50063, 0.86568).
# This points North-East, which goes inside the lot since the lot is situated north of the line 7-1.

def line_intersection(p1, p2, p3, p4):
    # Intersection of line segment p1-p2 and ray/segment p3-p4
    # Returns t, s where intersection is p1 + t*(p2-p1) = p3 + s*(p4-p3)
    # If segments intersect, 0 <= t <= 1 and s >= 0
    denom = (p4[1] - p3[1]) * (p2[0] - p1[0]) - (p4[0] - p3[0]) * (p2[1] - p1[1])
    if abs(denom) < 1e-10:
        return None
    num_t = (p4[0] - p3[0]) * (p1[1] - p3[1]) - (p4[1] - p3[1]) * (p1[0] - p3[0])
    num_s = (p2[0] - p1[0]) * (p1[1] - p3[1]) - (p2[1] - p1[1]) * (p1[0] - p3[0])
    t = num_t / denom
    s = num_s / denom
    return t, s

def split_polygon(d):
    # d is the distance from P7 along the line 7-1
    # Point X on 7-1:
    X = (P7[0] + d * u[0], P7[1] + d * u[1])
    
    # Ray starting at X in direction w
    # We want to find where this ray intersects the boundary of the polygon
    # Exclude segment 7-1 since the ray starts on it.
    # The other segments are: 1-2, 2-3, 3-4, 4-5, 5-6, 6-7
    boundary_segments = [
        (1, P1, P2),
        (2, P2, P3),
        (3, P3, P4),
        (4, P4, P5),
        (5, P5, P6),
        (6, P6, P7)
    ]
    
    intersections = []
    for idx, pa, pb in boundary_segments:
        res = line_intersection(pa, pb, X, (X[0] + w[0], X[1] + w[1]))
        if res is not None:
            t, s = res
            if 0.0 <= t <= 1.0 and s >= 0.0:
                intersections.append((s, t, idx, pa, pb))
                
    if not intersections:
        return None
        
    # Sort by s (distance along ray w) to get the closest intersection inside the lot
    intersections.sort(key=lambda x: x[0])
    s_closest, t_segment, seg_idx, pa, pb = intersections[0]
    
    # Intersection point Y
    Y = (X[0] + s_closest * w[0], X[1] + s_closest * w[1])
    
    # Form Lote A (Left side - containing P7)
    # The vertices of Lote A starting from P7:
    # We walk along the boundary from P7 to X: P7 -> X
    # Then cross the lot along the dividing line: X -> Y
    # Then walk from Y to P7 along the remaining boundary.
    # Let's see: Y is on segment seg_idx (which connects pa and pb).
    # Since we walk counter-clockwise: P7 -> X is along segment 7-1.
    # X is on 7-1. So the boundary path is:
    # P7 -> X -> Y -> (remaining vertices of the CCW path back to P7)
    # The CCW vertices are P7, P1, P2, P3, P4, P5, P6.
    # If Y is on segment 6-7 (between P6 and P7):
    # The path is: P7 -> X -> Y -> P7.
    # If Y is on segment 5-6 (between P5 and P6):
    # The path is: P7 -> X -> Y -> P6 -> P7.
    # If Y is on segment 4-5 (between P4 and P5):
    # The path is: P7 -> X -> Y -> P5 -> P6 -> P7.
    # If Y is on segment 3-4:
    # The path is: P7 -> X -> Y -> P4 -> P5 -> P6 -> P7.
    # If Y is on segment 2-3:
    # The path is: P7 -> X -> Y -> P3 -> P4 -> P5 -> P6 -> P7.
    # If Y is on segment 1-2:
    # The path is: P7 -> X -> Y -> P2 -> P3 -> P4 -> P5 -> P6 -> P7.
    
    lote_a_pts = [P7, X, Y]
    # Add vertices from the segment end to P7
    # seg_idx matches the index of the segment where Y lies.
    # 6 is P6-P7, 5 is P5-P6, 4 is P4-P5, 3 is P3-P4, 2 is P2-P3, 1 is P1-P2
    if seg_idx == 6:
        # Y is on P6-P7. So we just go from Y to P7. No intermediate vertices.
        pass
    elif seg_idx == 5:
        lote_a_pts.append(P6)
    elif seg_idx == 4:
        lote_a_pts.append(P5)
        lote_a_pts.append(P6)
    elif seg_idx == 3:
        lote_a_pts.append(P4)
        lote_a_pts.append(P5)
        lote_a_pts.append(P6)
    elif seg_idx == 2:
        lote_a_pts.append(P3)
        lote_a_pts.append(P4)
        lote_a_pts.append(P5)
        lote_a_pts.append(P6)
    elif seg_idx == 1:
        lote_a_pts.append(P2)
        lote_a_pts.append(P3)
        lote_a_pts.append(P4)
        lote_a_pts.append(P5)
        lote_a_pts.append(P6)
        
    # Form Lote B (Right side)
    # The path for Lote B is:
    # X -> P1 -> (CCW vertices until we reach pa) -> Y -> X
    lote_b_pts = [X]
    # Add vertices from P1 up to the start of the segment containing Y
    # The CCW list of vertices is P1, P2, P3, P4, P5, P6.
    # If Y is on segment 1-2 (seg_idx=1), pa is P1. The path is X -> P1 -> Y -> X.
    # If Y is on segment 2-3 (seg_idx=2), pa is P2. The path is X -> P1 -> P2 -> Y -> X.
    # If Y is on segment 3-4 (seg_idx=3), pa is P3. The path is X -> P1 -> P2 -> P3 -> Y -> X.
    # If Y is on segment 4-5 (seg_idx=4), pa is P4. The path is X -> P1 -> P2 -> P3 -> P4 -> Y -> X.
    # If Y is on segment 5-6 (seg_idx=5), pa is P5. The path is X -> P1 -> P2 -> P3 -> P4 -> P5 -> Y -> X.
    # If Y is on segment 6-7 (seg_idx=6), pa is P6. The path is X -> P1 -> P2 -> P3 -> P4 -> P5 -> P6 -> Y -> X.
    
    for i in range(1, seg_idx + 1):
        lote_b_pts.append(vertices[i])
    lote_b_pts.append(Y)
    
    area_a = polygon_area(lote_a_pts)
    area_b = polygon_area(lote_b_pts)
    
    return {
        'd': d,
        'X': X,
        'Y': Y,
        'lote_a_pts': lote_a_pts,
        'lote_b_pts': lote_b_pts,
        'area_a': area_a,
        'area_b': area_b,
        'seg_idx': seg_idx,
        't_segment': t_segment,
        'pa': pa,
        'pb': pb,
        's_closest': s_closest
    }

# 4. Bisection search to find d that gives exactly 50% area
target_area = total_area / 2.0
low = 0.0
high = len_7_1
tolerance = 1e-8
max_iter = 100

sol = None
for i in range(max_iter):
    mid = (low + high) / 2.0
    res = split_polygon(mid)
    if res is None:
        # Fallback or error
        high = mid
        continue
    
    area_a = res['area_a']
    if abs(area_a - target_area) < tolerance:
        sol = res
        break
    elif area_a < target_area:
        low = mid
    else:
        high = mid
else:
    sol = split_polygon((low + high) / 2.0)

print("\n--- Subdivisión 50/50 Encontrada ---")
print(f"Distancia d en el frente (desde P7): {sol['d']:.4f} m (de un total de {len_7_1:.4f} m)")
print(f"Coordenada Frente Varilla X: E = {sol['X'][0]:.3f}, N = {sol['X'][1]:.3f}")
print(f"Coordenada Fondo Varilla Y: E = {sol['Y'][0]:.3f}, N = {sol['Y'][1]:.3f}")
print(f"Largo de Línea Divisoria (XY): {sol['s_closest']:.4f} m")
print(f"Área Lote A (Izquierda): {sol['area_a']:.4f} m2 ({sol['area_a']/total_area*100.0:.2f}%)")
print(f"Área Lote B (Derecha): {sol['area_b']:.4f} m2 ({sol['area_b']/total_area*100.0:.2f}%)")
print(f"Suma de áreas: {sol['area_a'] + sol['area_b']:.4f} m2 (Total original: {total_area:.4f} m2)")

# Calculate distance of Y from segment vertices to locate it physically at the back
# sol['seg_idx'] is the segment index where Y lies.
# Let's find which vertices define this segment: pa and pb.
pa_coord = sol['pa']
pb_coord = sol['pb']
dist_pa_to_y = math.hypot(sol['Y'][0] - pa_coord[0], sol['Y'][1] - pa_coord[1])
dist_y_to_pb = math.hypot(pb_coord[0] - sol['Y'][0], pb_coord[1] - sol['Y'][1])
segment_total_len = math.hypot(pb_coord[0] - pa_coord[0], pb_coord[1] - pa_coord[1])

print(f"\nUbicación de Varilla Y (Fondo):")
print(f"  Está sobre el segmento entre el Punto {sol['seg_idx']} y Punto {sol['seg_idx']+1}")
print(f"  Punto de inicio del segmento (Punto {sol['seg_idx']}): E = {pa_coord[0]:.3f}, N = {pa_coord[1]:.3f}")
print(f"  Punto de fin del segmento (Punto {sol['seg_idx']+1}): E = {pb_coord[0]:.3f}, N = {pb_coord[1]:.3f}")
print(f"  Distancia desde Punto {sol['seg_idx']} hasta Varilla Y: {dist_pa_to_y:.4f} m")
print(f"  Distancia desde Varilla Y hasta Punto {sol['seg_idx']+1}: {dist_y_to_pb:.4f} m")
print(f"  Largo total del segmento de colindancia trasera: {segment_total_len:.4f} m")

# Let's save all these results to a JSON file so that the web page can read it or we can display it!
data_to_save = {
    'total_area': total_area,
    'target_area': target_area,
    'len_7_1': len_7_1,
    'd_front': sol['d'],
    'varilla_x': {'E': sol['X'][0], 'N': sol['X'][1]},
    'varilla_y': {'E': sol['Y'][0], 'N': sol['Y'][1]},
    'len_divisoria': sol['s_closest'],
    'area_a': sol['area_a'],
    'area_b': sol['area_b'],
    'vertices_original': [{'idx': i+1, 'E': pts[0], 'N': pts[1]} for i, pts in enumerate(vertices)],
    'lote_a_pts': [{'idx': i, 'E': pts[0], 'N': pts[1]} for i, pts in enumerate(sol['lote_a_pts'])],
    'lote_b_pts': [{'idx': i, 'E': pts[0], 'N': pts[1]} for i, pts in enumerate(sol['lote_b_pts'])],
    'seg_fondo_idx': sol['seg_idx'],
    'dist_pa_to_y': dist_pa_to_y,
    'dist_y_to_pb': dist_y_to_pb,
    'segment_total_len': segment_total_len
}

with open("subdivision_results.json", "w") as f:
    json.dump(data_to_save, f, indent=4)
print("\nResults successfully saved to subdivision_results.json")

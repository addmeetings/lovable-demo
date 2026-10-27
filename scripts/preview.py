# Render a structure to an isometric PNG without Minecraft:
#   node -e "import('./src/structures/castle.js').then(m=>console.log(JSON.stringify(m.buildCastle({x:0,y:0,z:0}).phases.flatMap(p=>p.commands))))" > cmds.json
#   python3 scripts/preview.py cmds.json preview.png   (needs: pip install pillow numpy)
import json, sys, numpy as np
from PIL import Image, ImageDraw
cmds = json.load(open(sys.argv[1]))
OX, OY, OZ = 64, 6, 64  # shift local coords to array indices
W, H = 129, 90
names = ['air']; ids = {'air': 0}
def bid(n):
    if n not in ids: ids[n] = len(names); names.append(n)
    return ids[n]
g = np.zeros((W, H, W), dtype=np.uint8)
for c in cmds:
    p = c.split()
    if p[0] == 'fill':
        x1,y1,z1,x2,y2,z2 = map(int, p[1:7]); blk = p[7]; mode = p[8] if len(p) > 8 else ''
        xs, ys, zs = slice(x1+OX, x2+OX+1), slice(y1+OY, y2+OY+1), slice(z1+OZ, z2+OZ+1)
        v = bid(blk)
        if mode == 'keep':
            sub = g[xs, ys, zs]; sub[sub == 0] = v
        elif mode == 'hollow':
            g[xs, ys, zs] = v; g[x1+OX+1:x2+OX, y1+OY+1:y2+OY, z1+OZ+1:z2+OZ] = 0
        else:
            g[xs, ys, zs] = v
    elif p[0] == 'setblock':
        x,y,z = map(int, p[1:4]); g[x+OX, y+OY, z+OZ] = bid(p[4])
col = {'stone':(125,125,125),'stone_bricks':(140,136,128),'polished_andesite':(160,160,158),'deepslate_tiles':(58,56,62),
 'glass_pane':(170,210,230),'grass_block':(95,150,60),'sand':(219,207,163),'water':(50,90,170),'dark_oak_planks':(70,50,30),
 'spruce_planks':(115,85,50),'spruce_log':(70,50,30),'spruce_leaves':(45,85,45),'iron_bars':(110,110,110)}
solid = g != 0
# visible = has an air neighbour (water surface only counts from above)
vis = np.zeros_like(solid)
for ax in range(3):
    for d in (1,-1):
        sh = np.roll(solid, d, axis=ax)
        vis |= solid & ~sh
water = ids.get('water', 255)
xs, ys, zs = np.nonzero(vis)
order = np.lexsort((ys, xs + zs))
s = 5; cx, cy = 0.866*s, 0.5*s
img = Image.new('RGB', (int(2*W*cx)+40, int(2*W*cy + H*s)+40), (175,205,235))
d = ImageDraw.Draw(img)
X0 = W*cx + 20; Y0 = H*s + 20 - W*cy*0  # top margin
def proj(x,y,z): return (X0 + (x - z)*cx, Y0 + (x + z)*cy - y*s - 0)
def shade(c,f): return tuple(int(v*f) for v in c)
for i in order:
    x,y,z = int(xs[i]),int(ys[i]),int(zs[i])
    c = col.get(names[g[x,y,z]], (255,0,255))
    a=proj(x,y+1,z); b=proj(x+1,y+1,z); cc=proj(x+1,y+1,z+1); dd=proj(x,y+1,z+1)
    e=proj(x+1,y,z); f=proj(x+1,y,z+1); h=proj(x,y,z+1)
    d.polygon([a,b,cc,dd], fill=c)
    if g[x,y,z] != water:
        d.polygon([dd,cc,f,h], fill=shade(c,0.75))
        d.polygon([b,cc,f,e], fill=shade(c,0.6))
img.save(sys.argv[2])
print('saved', img.size, 'visible voxels', len(order))

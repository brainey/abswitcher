#!/usr/bin/env python3

def arrow_down(x, y, size):
    # start = x,y x+size,y x+size,y+(2*size) x+(2*size),y+(2*size) x,y+(4*size),
    # x-(2*size),y+(2*size), x-size, y+(2*size), x-size, y, x,y
    points=[]
    points.append((x,        y))
    points.append((x+size,   y))
    points.append((x+size,   y+2*size))
    points.append((x+2*size, y+2*size))
    points.append((x,        y+4*size))
    points.append((x-2*size, y+2*size))
    points.append((x-size,   y+2*size))
    points.append((x-size,   y))
    points.append((x,        y))
    return points

def arrow_left(x, y, size):
    points=[]
    points.append((x,        y))
    points.append((x,        y+size))
    points.append((x-2*size, y+size))
    points.append((x-2*size, y+2*size))
    points.append((x-4*size, y))
    points.append((x-2*size, y-2*size))
    points.append((x-2*size, y-size))
    points.append((x,        y-size))
    points.append((x,        y))
    return points

def arrow_up(x, y, size):
    points=[]
    points.append((x,        y))
    points.append((x+size,   y))
    points.append((x+size,   y-2*size))
    points.append((x+2*size, y-2*size))
    points.append((x,        y-4*size))
    points.append((x-2*size, y-2*size))
    points.append((x-size,   y-2*size))
    points.append((x-size,   y))
    points.append((x,        y))
    return points

def arrow_right(x, y, size):
    # start = x,y x+size,y x+size,y+(2*size) x+(2*size),y+(2*size) x,y+(4*size),
    # x-(2*size),y+(2*size), x-size, y+(2*size), x-size, y, x,y
    points=[]
    points.append((x,        y))
    points.append((x,        y+size))
    points.append((x+2*size, y+size))
    points.append((x+2*size, y+2*size))
    points.append((x+4*size, y))
    points.append((x+2*size, y-2*size))
    points.append((x+2*size, y-size))
    points.append((x,        y-size))
    points.append((x,        y))
    return points

def arrow(x, y, size=5, orientation=0):
    '''
         x - mid point of base of arrow
         y - base of arrow
         orientation - orientation of arrow
             0 - arrow pointing down
             1 - arrow pointing left
             2 - arrow pointing up
             3 - arrow pointing right
    '''
    arrows = {0: arrow_down,
              1: arrow_left,
              2: arrow_up,
              3: arrow_right,
    }
    points = arrows[orientation](x, y, size)
    s = ""
    for point in points:
        s += "%d,%d "%point

    return s.rstrip()

if __name__ == "__main__":
    print('left scroll up: "%s"' % arrow(50, 190, 5, 2));
    print('left scroll button: "%s"' % arrow(45, 200, 5, 1));
    print('left scroll down: "%s"' % arrow(50, 210, 5, 0));
    print('right scroll up: "%s"' % arrow(350, 190, 5, 2));
    print('right scroll button: "%s"' % arrow(355, 200, 5, 3));
    print('right scroll down: "%s"' % arrow(350, 210, 5, 0));
    

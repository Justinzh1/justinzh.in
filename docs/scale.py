def scale(w,h,ratio):
    print(w/ratio, h/ratio)

def scaleTo(w,h,nw):
    ratio = nw/float(w)
    print ('w:',nw,'h:',ratio*h)

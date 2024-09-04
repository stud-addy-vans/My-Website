def rec(n, i):
    if i>10:
        return
    print(f"{n}X{i}={n*i}")
    return rec(13, i+1)

rec(13,1)

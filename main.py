k = input()
v = input()
keys = []
values = []

for i in k:
    keys.append(i)
for j in v:
    values.append(j)

map = {}

for i in range(len(keys)):
    value = None
    if i < len(values):
        value = values[i]
    map[keys[i]] = value

print(map.items())


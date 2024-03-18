# ProyectoFinal_FullStack
Proyecto final para el módulo FullStack

# v1 diagrama de entidades
![image](https://github.com/PabloMocholi/ProyectoFinal_FullStack/assets/148113056/7483292a-3f6d-410e-aeba-017fd11520f0)

```
usuarios [icon: user] {
    id int pk
    name string
    password string
    email string
    is_admin  int 
    created_at DateTime
    updated_at DateTime
    deleted_at DateTime
}

albumes [icon: music] {
  id int pk
  nombre string
  created_at DateTime
  updated_at DateTime
  deleted_at DateTime
}


canciones [icon: music] {
  id int pk
  nombre string
  duracion string
}

generos [icon: archive] {
  id int pk
  genero string
}

artistas [icon: user-plus]{
  id int pk
  nombre string
  descripcion string
}

generos_albumes [icon: link] {
  id int pk
  id_album int
  id_genero int
}

artistas_albumes [icon: link]{
  id int pk
  id_album int
  id_artista int
}
canciones_albumes [icon: link]{
  id int pk
  id_album int
  id_cancion int
}


albumes.id <>  canciones_albumes.id_album
canciones_albumes.id_cancion <> canciones.id

albumes.id <>  generos_albumes.id_album
generos_albumes.id_genero <> generos.id


albumes.id <>  artistas_albumes.id_album
artistas_albumes.id_artista <> artistas.id
```

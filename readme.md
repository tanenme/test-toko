# DOKUMENTASI API
## User API

### Signup

**Endpoint:** POST http://127.0.0.1:3000/signup

**Deskripsi:** Mendaftarkan pengguna baru.

**Headers**

| Key | Value |
|---|---|
| Content-Type | application/json |

**Body**

| Parameter | Tipe Data | Keterangan |
|---|---|---|
| username | string | **Wajib**. Minimal 6 karakter, maksimal 8 karakter. |
| password | string | **Wajib**. Minimal 6 karakter, maksimal 8 karakter. |


**Response**

| Parameter | Tipe Data | Keterangan |
|---|---|---|
| success | boolean | Menunjukkan apakah permintaan berhasil atau tidak. |
| msg | string | Pesan response dari server. |

**Contoh CURL**

```bash
curl --location --request POST 'http://127.0.0.1:3000/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "johndoe",
    "password": "securepwd"
}
```

###  Signin

**Endpoint:** POST http://127.0.0.1:3000/signin

**Deskripsi:** Masuk ke aplikasi untuk mengakses fitur

**Headers:**

|Key | Value |
|---|---|
| Content-Type | application/json |

**Body**

| Parameter | Tipe Data | Keterangan |
|---|---|---|
| username | string | **Wajib**. Minimal 6 karakter, maksimal 8 karakter. |
| password | string | **Wajib**. Minimal 6 karakter, maksimal 8 karakter. |

**Response**

| Parameter | Tipe Data | Keterangan |
|---|---|---|
| succes | Boolean | Menunjukan apakah permintaan Berhasil atau Tidak |
| msg | string | Pesan response dari server. |
| token | JWT | Jika succes True maka menghasilkan JWT yang berisi data expired |

```bash
curl --location --request POST 'http://127.0.0.1:3000/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "johndoe",
    "password": "securepwd"
}
```

## Barang API 

### Add Barang

**Endpoint:** POST http://127.0.0.1:3000/barang/add

**Deskripsi:** Menambah data barang.

**Headers**

| Key | Value |
|---|---|
| Content-Type | application/json |
| Authorization | 'Header JWT' |

**Body**

| Parameter | Tipe Data | Keterangan |
|---|---|---|
| nama barang | string | **Wajib**. Minimal 2 karakter, maksimal 50 karakter. |
| harga_beli | Number | **Wajib**. |
| harga_jual | Number | **Wajib**. |
| stok | Number | **Wajib**. |



**Response**

| Parameter | Tipe Data | Keterangan |
|---|---|---|
| success | boolean | Menunjukkan apakah permintaan berhasil atau tidak. |
| msg | string | Pesan response dari server. |

**Contoh CURL**

```bash
curl --location --request POST 'http://127.0.0.1:3000/barang/add' \
--header 'Content-Type: application/json', 'Authorization': 'Bearer JWT_TOKEN' \
--data-raw '{
    "nama_barang": "honda",
    "harga_beli": 2000000,
    "harga_jual": 3000000,
    "stok": 50
}
```

### Find Barang

**Endpoint:** GET http://127.0.0.1:3000/barang/find

**Deskripsi:** Melihat data barang.

**Headers**

| Key | Value |
|---|---|
| Authorization | 'Header JWT' |

**Response**

| Parameter | Tipe Data | Keterangan |
|---|---|---|
| success | boolean | Menunjukkan apakah permintaan berhasil atau tidak. |
| msg | string | Pesan response dari server. jika parameter success **true** maka akan menampilkan array berisi object data barang |

**Contoh CURL**

```bash
curl --location --request GET 'http://127.0.0.1:3000/barang/find'
```

### Update Barang

**Endpoint:** POST http://127.0.0.1:3000/barang/update

**Deskripsi:** Mengupdate data barang.

**Headers**

| Key | Value |
|---|---|
| Content-Type | application/json |
| Authorization | 'Header JWT' |

**Body**

| Parameter | Tipe Data | Keterangan |
|---|---|---|
| id_barang | Number | **Wajib**. |
| update | object | **Wajib**. obejct berisi perubahan yang akan diterapkan |


**Response**

| Parameter | Tipe Data | Keterangan |
|---|---|---|
| success | boolean | Menunjukkan apakah permintaan berhasil atau tidak. |
| msg | string | Pesan response dari server. |

**Contoh CURL**

```bash
curl --location --request PATCH 'http://127.0.0.1:3000/barang/update' \
--header 'Content-Type: application/json', 'Authorization': 'Bearer JWT_TOKEN' \
--data-raw '{
    "id_barang": 2,
    "update": {
        "nama_barang": "inibarang",
        "stok": 200
    }
```

### Delete Barang

**Endpoint:** POST http://127.0.0.1:3000/

**Deskripsi:** Mendaftarkan pengguna baru.

**Headers**

| Key | Value |
|---|---|
| Content-Type | application/json |

**Body**

| Parameter | Tipe Data | Keterangan |
|---|---|---|
| username | string | **Wajib**. Minimal 6 karakter, maksimal 8 karakter. |
| password | string | **Wajib**. Minimal 6 karakter, maksimal 8 karakter. |


**Response**

| Parameter | Tipe Data | Keterangan |
|---|---|---|
| success | boolean | Menunjukkan apakah permintaan berhasil atau tidak. |
| msg | string | Pesan response dari server. |

**Contoh CURL**

```bash
curl --location --request POST 'http://127.0.0.1:3000/signup' \
--header 'Content-Type: application/json', 'Authorization': 'Bearer JWT_TOKEN' \
--data-raw '{
    "username": "johndoe",
    "password": "securepwd"
}
```
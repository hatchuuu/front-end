

# Tahap 1 - Install Library yang akan digunakan
React-Query
Yup
Axios
Formik
Cakra Ui

Import komponen dari cakra ui dan query-client
Setting cakra ui pada bagian _app.js agar dapat digunakan

Gunakan axios untuk melakukan fetching data 
lakukan async dan juga try-catch semisalnya untuk handle error

jangan lupa untuk menggunakan cors pada bagian backend

Untuk menghemat waktu saat melakukan fetching data menggunakan axios, smisalnya untuk CRUD

Maka pisahkan axios ke dalam lib/axios dan kemudian berikan baseUrl sebagai url defaultnya

replace dan masukkan hanya root dari baseUrl yang sudah dimasukkan sebelumnya

buat sebuah fitur untuk select semua data menggunakan axios.get yang membutuhkan sebuah url, untuk mempermudahnya, buat sebuah lib yang akan menyimpan url dengan properti baseUrl

buat sebuah function yang akan menhandle renderProduct dimana akan mndapatkan data dari fetching product, dengan bantuan Use State dengan cara setting useState, masukkan data fetching ke setUseState. kemudian consume dan letakkan dengan mapping

Buat sebuah logic loading dimana menggunakan usestate. tambahkan sebuah set time out agar menjadi simulasi delay pada sistem pengambilan data. ketika data ada maka laoding false. tambahkan juga conditional rendering

Implementasi dari REACT-QUERY

Buat sebuah form menggunakan formik
menggunakan useFormik() dan masukkan nilai awal dari isinya, yaitu string kosong

Membuat POST data
semua input diberikan nama dan value
reset form ketika sudah selesai
berikan Toast untuk menampilkan hasil apakah sukses atau tidaknya

Refetch data agar langsung diupdate

Pisahkan dan masukkan ke dalam file baru dengan nama useCreateProduct
buat sebuah return hanya onSuccess atau onError saja

import Head from "next/head";
import { Container, Heading, Table, Tr, Td, Th, Tbody, Thead, Spinner, FormControl, FormLabel, Input, Button, VStack, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import DeleteButton from "@/components/DeleteButton";
import { UseFetchProducts } from "@/features/product/useFetchProducts";
import { useCreateProduct } from "@/features/product/useCreateProduct";
import { useDeleteProduct } from "@/features/product/useDeleteProduct";
import { useEditProduct } from "@/features/product/useEditProduct";

export default function Home() {
  const toast = useToast();

  //fetching product
  const { data: products, isLoading: productsIsLoading, refetch: refetchProducts } = UseFetchProducts({
    onError: () => {
      toast({
        title: "Product Fetch Failed",
        description: "Product fetch failed, please try again later",
        status: "error",
        isClosable: true
      });
    }
  });



  //render product
  const renderProducts = () => {
    return products.map((value) => { 
      return (
        <Tr key={value.id}>
          <Td>{value.id}</Td>
          <Td>{value.name}</Td>
          <Td>{value.price}</Td>
          <Td>{value.description}</Td>
          <Td>{value.image}</Td>
          <Td>
            <Button onClick={() => onEditClick(value)} colorScheme="yellow">Edit</Button>
          </Td>
          <Td>
            <DeleteButton
              id={value.id}
              deleteMutation={deleteProduct}
              onSuccess={() => console.log('Deleted product and closed dialog')} />
          </Td>
        </Tr>
      );
    })
  };

  //control form
  //1. Inisialisasi nilai awal form
  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      description: "",
      image: "",
      id: 0
    },
    onSubmit: () => {
      //Melakukan post/product dan patch/product
      const { name, price, description, image, id} = formik.values;

      if(id){
        editProduct({
          name,
          price: parseInt(price),
          description,
          image,
          id
        });

        toast({
          title: "Product Edited",
          description: "Product has been edited successfully",
          status: "success",
          duration: 1500,
          isClosable: true
        });
      }
      else{
        createProduct({
          name,
          price: parseInt(price),
          description,
          image
        });

        //Alert
        toast({
          title: "Product Added",
          description: "Product has been created successfully",
          status: "success",
          duration: 1500,
          isClosable: true
        });
      }

      //reset form
      formik.setFieldValue("id", "");
      formik.setFieldValue("name", "");
      formik.setFieldValue("price", 0);
      formik.setFieldValue("description", "");
      formik.setFieldValue("image", "");
    }
  })
  //2. Handle submit form, mengambil data dari form dari onChange
  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value)
  }

  // const onEditClick = (product) => {
  //   setIsInvicible(isInvicible => !isInvicible);
  //   if (!isInvicible) {
  //     formik.setFieldValue("id", product.id);
  //     formik.setFieldValue("name", product.name);
  //     formik.setFieldValue("description", product.description);
  //     formik.setFieldValue("price", product.price);
  //     formik.setFieldValue("image", product.image);
  //   }
  //   else  {
  //   formik.setFieldValue("id", "");
  //   formik.setFieldValue("name", "");
  //   formik.setFieldValue("price", 0);
  //   formik.setFieldValue("description", "");
  //   formik.setFieldValue("image", "");
  //   }
  // }

  const [isFormVisible, setIsFormVisible] = useState(false); // Kontrol visibilitas form
  const [lastProductId, setLastProductId] = useState(null); // Menyimpan ID produk terakhir yang diklik

  const onEditClick = (product) => {
    if (lastProductId === product.id) {
      // Jika ID sama, kosongkan form dan sembunyikan inputId
      setIsFormVisible(false);
      formik.setFieldValue("id", "");
      formik.setFieldValue("name", "");
      formik.setFieldValue("description", "");
      formik.setFieldValue("price", "");
      formik.setFieldValue("image", "");
      setLastProductId(null); // Reset ID terakhir
    } else {
      // Jika ID berbeda, tampilkan form dan isi dengan data produk
      setIsFormVisible(true);
      formik.setFieldValue("id", product.id);
      formik.setFieldValue("name", product.name);
      formik.setFieldValue("description", product.description);
      formik.setFieldValue("price", product.price);
      formik.setFieldValue("image", product.image);
      setLastProductId(product.id); // Simpan ID yang diklik
    }
  };


  //POST
  const { mutate: createProduct, isLoading: createProductsIsLoading } = useCreateProduct({
    onSuccess: () => {
      refetchProducts();
    }
  })

  //DELETE
  const { mutate: deleteProduct, isLoading: deleteProductIsLoading } = useDeleteProduct({
    onSuccess: () => {
      refetchProducts();
    }
  })

  //PATCH
  const { mutate: editProduct, isLoading: editProductIsLoading } = useEditProduct({
    onSuccess: () => {
      refetchProducts();
    }
  })


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <Heading >Home Page</Heading>
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Price</Th>
                <Th>Description</Th>
                <Th>Image</Th>
                <Th colSpan={2}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* menggunakan ternary options */}
              {productsIsLoading ? <Tr><Td><Spinner /></Td></Tr> : renderProducts()}

              {/* menggunakan short-circuit 
              Jika isLoading true maka execute setelah &&
              Short-Circuit masbrooo */}

              {/* {isLoading &&  <Tr><Td><Spinner /></Td></Tr>}
              {!isLoading && renderProducts()} */}
            </Tbody>
          </Table>

          <form onSubmit={formik.handleSubmit}>
            <VStack spacing='10px' marginTop={4}>
              {isFormVisible && (
                <FormControl name="inputId">
                  <FormLabel>Product Id</FormLabel>
                  <Input name="id" onChange={handleFormInput} type="text" value={formik.values.id} placeholder="Masukkan id" />
                </FormControl>
              )}
              <FormControl>
                <FormLabel>Product Name</FormLabel>
                <Input name="name" onChange={handleFormInput} type="text" value={formik.values.name} placeholder="Masukkan nama" />
              </FormControl>
              <FormControl>
                <FormLabel>Product Price</FormLabel>
                <Input name="price" onChange={handleFormInput} type="number" value={formik.values.price} placeholder="Masukkan harga" />
              </FormControl>
              <FormControl>
                <FormLabel>Product Description</FormLabel>
                <Input name="description" onChange={handleFormInput} type="text" value={formik.values.description} placeholder="Masukkan deskripsi" />
              </FormControl>
              <FormControl>
                <FormLabel>Product Image</FormLabel>
                <Input name="image" onChange={handleFormInput} type="text" value={formik.values.image} placeholder="Masukkan image" />
              </FormControl>
              <FormControl>
                {createProductsIsLoading || editProductIsLoading ? <Spinner /> : <Button type="submit">Submit Product</Button>}
              </FormControl>
            </VStack>
          </form>
        </Container>
      </main>
    </>
  );
}

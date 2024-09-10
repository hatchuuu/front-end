import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button
} from '@chakra-ui/react'

import React from 'react'

const DeleteButton = ({ id, deleteMutation, onSuccess }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const handleDelete = () => {
        // Check if deleteMutation is defined and has the mutate function
        deleteMutation(id, {
            onSuccess: () => {
                if (onSuccess) onSuccess(); // Call optional success callback
                onClose(); // Close the dialog after successful deletion
            },
            onError: (error) => {
                console.error('Error deleting item:', error);
            }
        });
    };

    return (
        <>
            <Button colorScheme='red' onClick={onOpen}>
                Delete
            </Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Hapus Data
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Apakah kamu yakin untuk menghapus data ini?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={handleDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default DeleteButton;

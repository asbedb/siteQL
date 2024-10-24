import React from "react";
import { ToastProps } from '../../types/types'; 

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";


const Toast: React.FC<ToastProps> = ({ message, isOpen, onClose }) => {
    return(
        <>
            <Modal 
                isOpen={isOpen} 
                placement='bottom'
                onOpenChange={onClose} 
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">SiteQL Notification</ModalHeader>
                            <ModalBody>
                                <p>
                                    {message} 
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default Toast;
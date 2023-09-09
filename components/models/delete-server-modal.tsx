"use client"

import { useState } from "react";
import axios from 'axios'
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";




export const DeleteServerModal = () => {
    const router = useRouter()
    const { isOpen, onClose, type, data } = useModal()

    const isModalOpen = isOpen && type === "deleteServer"
    const { server } = data

    const [isLoading, setLoading] = useState(false)

    const onClick = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/servers/${server?.id}`)

            onClose()
            router.refresh()
            router.push('/')
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to do this? <br />
                        <span className="font-medium text-indigo-500 mr-2">
                            {server?.name}
                        </span>
                        will be permanently deleted!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-grey-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button variant='ghost' disabled={isLoading} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant='primary' disabled={isLoading} onClick={onClick}>
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


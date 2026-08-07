"use client";

import { Trash2, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { updateStatus, updateUser } from "../../_action/updateUser";
import { userDelete } from "../../_action/userDelete";
import { StatusCell } from "./statusModel";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Role = "USER" | "ADMIN" | "PROVIDER";

type Status = "ACTIVE" | "SUSPEND";

interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    status: Status;
    createdAt: string;
    updatedAt: string;
}

interface UserTableProps {
    users: User[];


}

const UserTable = ({
    users,


}: UserTableProps) => {
    const [open, setOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [selectedRole, setSelectedRole] = useState<Role>("USER");
    const router = useRouter()

    const onRoleChange = (id: string, role: Role) => {
        setSelectedUserId(id);
        setSelectedRole(role);
        setOpen(true);
    };

    

    const onStatusChange = async (
        id: string,
        status: "ACTIVE" | "SUSPEND"
    ) => {
        const result = await updateStatus(id, status)
       
        if (result.success) {
            toast.success("Status Update Successfully")
            router.refresh()
        }

        // updateUserStatus(id, status)
    };
    const onDelete = (id: string) => {
        userDelete(id)
    }
    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-62.5">Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Change Role</TableHead>
                        <TableHead className="text-center">Delete</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">
                                {user.name}
                            </TableCell>

                            <TableCell>{user.email}</TableCell>

                            <TableCell>
                                <Badge
                                    variant={
                                        user.role === "ADMIN"
                                            ? "default"
                                            : user.role === "PROVIDER"
                                                ? "secondary"
                                                : "outline"
                                    }
                                >
                                    {user.role}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <StatusCell
                                    id={user.id}
                                    status={user.status}
                                    onStatusChange={onStatusChange}

                                />
                            </TableCell>

                            <TableCell className="text-center">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onRoleChange(user.id, user.role as Role)}
                                >
                                    <ShieldCheck className="mr-2 h-4 w-4" />
                                    Change
                                </Button>
                            </TableCell>

                            <TableCell className="text-center">
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => onDelete?.(user.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Change User Role</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Role</label>

                        <Select
                            value={selectedRole}
                            onValueChange={(value) => setSelectedRole(value as Role)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="USER">USER</SelectItem>
                                <SelectItem value="PROVIDER">PROVIDER</SelectItem>
                                <SelectItem value="ADMIN">ADMIN</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>

                        <Button
                            onClick={async () => {
                               const result= await updateUser(selectedUserId,selectedRole);
                                
                                if(result.success){
                                    toast.success("Role update Successfull!")
                                    router.refresh()
                                }
                                setOpen(false);
                            }}
                        >
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>

    );

};

export default UserTable;
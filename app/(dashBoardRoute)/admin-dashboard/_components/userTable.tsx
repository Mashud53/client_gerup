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
import { updateStatus, updateUser } from "../../_action/updateUser";
import { userDelete } from "../../_action/userDelete";
import { StatusCell } from "./statusModel";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
    const router = useRouter()

    const onRoleChange = (id: string) => {
        updateUser(id)


    }

    // const onStatusChange = (id: string) => {
    //     console.log(id);
    // }
    const onStatusChange = async (
        id: string,
        status: "ACTIVE" | "SUSPEND"
    ) => {
       const result =await updateStatus(id, status)
       console.log(result, "result ===========");
       if(result.success){
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
                                    onClick={() => onRoleChange?.(user.id)}
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
        </div>
    );
    return (
        <div>

        </div>
    );
};

export default UserTable;
"use client";

import { useState } from "react";
import { Table, Button, Avatar } from "@heroui/react";
import { toast } from "sonner";
import { updateUser } from "@/lib/actions/users";

export const ManageUsers = ({ users: initialUsers }) => {
  const [users, setUsers] = useState(initialUsers);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const handleToggleBlock = async (userId, isBlocked) => {
    console.log(userId, isBlocked);
    setActionLoadingId(userId);
    try {
      await updateUser(userId, { isBlocked: !isBlocked });
      toast.success(isBlocked ? "User unblocked" : "User blocked");

      // update local state — no refetch needed
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, isBlocked: !isBlocked } : u,
        ),
      );
    } catch (err) {
      toast.error("Action failed. Please try again.");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Manage Users</h1>
        <p className="text-sm text-foreground-500 mt-1">
          {users.length} total registered users
        </p>
      </div>

      <Table>
        <Table.ScrollContainer >
          <Table.Content aria-label="Users table">
            <Table.Header>
              <Table.Column isRowHeader className="w-10">
                #
              </Table.Column>
              <Table.Column>User</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column>Role</Table.Column>
              <Table.Column>Plan</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column className="text-right">Actions</Table.Column>
            </Table.Header>

            <Table.Body emptyContent="No users found.">
              {users.map((user, index) => (
                <Table.Row key={user._id}>
                  <Table.Cell>
                    <span className="text-sm text-foreground-400">
                      {index + 1}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <Avatar.Image alt="User Avatar" src={user.image} />
                        <Avatar.Fallback>
                          {user?.name?.slice(0, 2).toUpperCase()}
                        </Avatar.Fallback>
                      </Avatar>
                      <span className="text-sm font-medium text-foreground">
                        {user.name}
                      </span>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <span className="text-sm text-foreground-500">
                      {user.email}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
                        user.role === "admin"
                          ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
                          : user.role === "founder"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                            : "bg-default-100 text-foreground-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
                        user.plan === "premium"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                          : "bg-default-100 text-foreground-500"
                      }`}
                    >
                      {user.plan || "free"}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        user.isBlocked
                          ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                      }`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex justify-end">
                      <button
                        
                        isLoading={actionLoadingId === user._id}
                        onClick={() =>
                          handleToggleBlock(user._id, user.isBlocked)
                        }
                        className={
                          `${user.isBlocked
                            ? 'text-violet-600'
                            : ""} cursor-pointer` 
                        }
                      >
                        {user.role==="admin"?<></>:<>{user.isBlocked ? "Unblock" : "Block"}</>}
                        
                      </button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

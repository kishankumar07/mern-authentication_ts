import { Button, Container, Table } from "react-bootstrap";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../slices/adminApiSlice";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";

interface User{
  _id:string;
  name:string;
  email:string;
  password:string;
  isAdmin:boolean;
}


const AdminDashboard = () => {
  const { data, isLoading, error } = useGetUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users.</p>;
  // Check if users exist and is an array
  if (!data || !Array.isArray(data.users)) {
    return <p>No users found.</p>;
  }

  const handleDelete = async (id:string) => {
    try {
      await deleteUser(id).unwrap();
      toast.success("user deleted successfully")
    } catch (err) {
      const errorMessage =
        (err as { data?: { message?: string; error?: string } }).data
          ?.message || (err as { error?: string }).error;
      toast.error(errorMessage);
    }
  };

  return (
    <Container className="d-flex justify-content-center flex-column align-items-center mt-5">
      <Table
        striped
        bordered
        hover
        style={{ width: "60%" }}
        className="text-center"
      >
        <thead>
          <tr>
            <th>S.No</th>
            <th style={{ whiteSpace: "nowrap" }}>ID</th>
            <th style={{ whiteSpace: "nowrap" }}>Name</th>
            <th style={{ whiteSpace: "nowrap" }}>Email</th>
            <th style={{ whiteSpace: "nowrap" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map((user:User, index:number) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td
                style={{
                  whiteSpace: "nowrap",
                  maxWidth: "150px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user._id}
              </td>
              <td style={{ whiteSpace: "nowrap" }}>{user.name}</td>
              <td style={{ whiteSpace: "nowrap" }}>{user.email}</td>
              <td style={{ whiteSpace: "nowrap" }}>
                <LinkContainer to={`/admin/updateUserInfo/${user._id}`}>
                  <Button variant="warning" className="me-2">
                    Edit
                  </Button>
                </LinkContainer>

                <Button variant="danger" onClick={()=>{handleDelete(user._id)}}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <LinkContainer to="/admin/createUser">
        <Button variant="success">Add User</Button>
      </LinkContainer>
    </Container>
  );
};

export default AdminDashboard;

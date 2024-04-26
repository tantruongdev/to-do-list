import { useEffect, useState } from "react";
import { getUserList } from "../../services/userService";
import { Divider, Select } from "antd";
import Tasks from "./Tasks";
import "./Tasks.scss";
const { Option } = Select;

function UserList() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch danh sách user sau chi render lần đầu tiên
  useEffect(() => {
    const fetchUserList = async () => {
      const result = await getUserList();
      setUsers(result);
    };
    fetchUserList();
  }, []);

  const handleChange = (e) => {
    setCurrentUser(parseInt(e));
  };

  return (
    <>
      <div className="wrapper">
        <Divider orientation="left" plain>
          <h2>User</h2>
        </Divider>
        <div className="user__list">
          {users && (
            <Select
              showSearch
              style={{ width: 200 }}
              optionFilterProp="children"
              onChange={handleChange}
              placeholder={"Select user"}
            >
              {users.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        </div>
        <Tasks currentUser={currentUser}></Tasks>
      </div>
    </>
  );
}

export default UserList;

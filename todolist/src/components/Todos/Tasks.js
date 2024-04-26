import { useState, useEffect, useMemo } from "react";
import { Button, Divider, List } from "antd";
import { message } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Tasks.scss";
import { getTaskList, updateTaskStatus } from "../../services/taskService";
import { CheckCircleTwoTone, MinusSquareTwoTone } from "@ant-design/icons";

function Tasks(props) {
  const { currentUser } = props;
  const [tasks, setTasks] = useState([]);
  const [loadings, setLoadings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch danh sách task khi currentUser hoặc loading thay đổi
  useEffect(() => {
    const fetchTaskList = async () => {
      const result = await getTaskList(currentUser);
      setTasks(result);
    };
    fetchTaskList();
  }, [currentUser, loading]);

  // Sắp xếp danh sách nhiệm vụ theo trạng thái hoàn thành và id
  const sortedTasks = useMemo(() => {
    return tasks.sort((a, b) => {
      if (!a.completed && b.completed) return -1;
      if (a.completed && !b.completed) return 1;
      return a.id - b.id;
    });
  }, [tasks]);

  // Xử lý khi click vào button Mark done
  const markDone = async (taskId, index) => {
    try {
      const result = await updateTaskStatus(taskId, { completed: true });
      if (result.id) {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = true;
          return newLoadings;
        });
        setTimeout(() => {
          setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = false;
            return newLoadings;
          });
          setLoading(!loading);
        }, 1000);
      } else {
        message.error("Error marking task as done");
      }
    } catch (error) {
      console.error("Error marking task as done:", error);
    }
  };

  // Render số lượng task done/tổng số task
  const renderTaskStatus = () => {
    const doneCount = tasks.filter((task) => task.completed).length;
    const totalCount = tasks.length;
    return <p>{`Done ${doneCount}/${totalCount} tasks `}</p>;
  };

  return (
    <>
      <div className="tasks">
        <Divider orientation="left" plain>
          <h2>Tasks</h2>
        </Divider>
        <div
          id="scrollableDiv"
          style={{
            height: 400,
            overflow: "auto",
            padding: "0 16px",
            border: "1px solid rgba(140, 140, 140, 0.35)",
            borderRadius: "8px",
          }}
        >
          <InfiniteScroll
            dataLength={sortedTasks.length}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={sortedTasks}
              renderItem={(item, index) => (
                <>
                  <List.Item
                    key={item.id}
                    className={`tasks__item ${
                      item.completed ? "tasks__item--completed" : ""
                    }`}
                  >
                    <div className="tasks__content">
                      {item.completed ? (
                        <CheckCircleTwoTone twoToneColor="#52c41a" />
                      ) : (
                        <MinusSquareTwoTone />
                      )}
                      <span>{item.title}</span>
                    </div>
                    {!item.completed && (
                      <div className="tasks__manipulate">
                        <Button
                          type="primary"
                          loading={loadings[index]}
                          onClick={() => markDone(item.id, index)}
                        >
                          Mark Done
                        </Button>
                      </div>
                    )}
                  </List.Item>
                </>
              )}
            />
          </InfiniteScroll>
        </div>

        <div>{tasks.length > 0 && renderTaskStatus()}</div>
      </div>
    </>
  );
}

export default Tasks;

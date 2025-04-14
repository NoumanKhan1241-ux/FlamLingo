import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { CourseList } from "./course/list";
import { CourseCreate } from "./course/create"; // ⬅️ Import create

const dataProvider = simpleRestProvider("/api");

const AdminClient = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        list={CourseList}
        create={CourseCreate} // ⬅️ Add this line
        recordRepresentation="title"
      />
    </Admin>
  );
};

export default AdminClient;

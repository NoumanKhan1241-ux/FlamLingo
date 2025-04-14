import { SimpleForm, Edit, TextInput, required, TextField } from "react-admin";

export const CourseEdit = () =>{
    return(
    <Edit>
        <SimpleForm >
            <TextInput source="id" validate={[required()]} label="Id"/>
            <TextInput source="title"validate={[required()]} label="Title"/>

            <TextInput source="ImageSrc"validate={[required()]} label="Image"/>

        </SimpleForm>
    </Edit>
    );
};

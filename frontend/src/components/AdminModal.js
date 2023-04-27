import { Modal, Button,TextInput} from '@mantine/core';
import { useForm } from '@mantine/form';

const AdminModal = ({opened,setOpened,setAdmin})=>{
    const form = useForm({
        initialValues: {
          code: ''
        }
      });
    return (
        <Modal opened={opened}  onClose={() => setOpened(false)}>
            <form onSubmit={form.onSubmit((values) => {localStorage.setItem("admin",values.code);setOpened(false);setAdmin(true);})}>
                <TextInput
                withAsterisk
                label="Admin Code"
                {...form.getInputProps('code')}
                />
                <br></br>
                <Button type="submit">Submit</Button>
            </form>
        </Modal>
    )
}

export default AdminModal
import  UserList  from '../components/UserList';

const ExamplePage = () => {
    return (
        <div>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-2">User List</h1>
                <p>This is user list page.</p>
            </div>
            <h1>Fetched Data Successfuly</h1>
            <UserList /> 
        </div>
    );
};

export default ExamplePage;

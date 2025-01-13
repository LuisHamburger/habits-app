import { Header } from '../../components/header.component';
export const Create = () => {
    return <>

        <Header />

        <form className='w-100'>
            <div className="my-3 text-center">
                <label itemRef="exampleInputEmail1" className="form-label">Name</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <button type="submit" className="btn c-btn-outline-green w-100">Create</button>
        </form>
    </>
}
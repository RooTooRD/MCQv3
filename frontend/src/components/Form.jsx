import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import api from './../js/api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../js/constants'

function Form({route, method, login}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [wilaya, setWilaya] = useState(''); 
    const [grade, setGrade] = useState('');   
    const [availablesWilayas, setAvailableWilayas] = useState([])
    const [availableGrades, setAvailableGrades] = useState([])
    
    const navigate = useNavigate()

    const title = method === 'login' ? 'Login' : 'Register';

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();

        try {
            var data = {}
            if (!login){ 
                data = { email, password, wilaya, grade }
            } else {
                data = { email, password }
            }
            setLoading(true)
            const response = await api.post(route, data);
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                setLoading(false)
                navigate('/dashboard');
            } else {
                setLoading(false)
                navigate('/login');
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        const fetchWilayasAndGrades = async () => {
            try {
                const wilayasResponse = await api.get('/api/wilayas'); // Adjust endpoint as necessary
                const gradesResponse = await api.get('/api/grades');     // Adjust endpoint as necessary
                
                setAvailableWilayas(wilayasResponse.data);
                setAvailableGrades(gradesResponse.data);
            } catch (error) {
                console.error('Error fetching wilayas and grades:', error);
            }
        };

        fetchWilayasAndGrades();
    }, []);

  return (

    <form onSubmit={handleSubmit} className='z-10 flex flex-col w-56 lg:w-1/5 text-center space-y-6' >
        <h1 className='font-bold text-3xl ' >{title}</h1>
        <input 
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='email' 
        className='px-4 py-2  rounded-full text-gray-700'/>

        
        <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='password' 
        className='px-4 py-2 rounded-full text-gray-700'/>

            {login ? null : 
                <>
                    
                    <select
                        value={wilaya}
                        onChange={(e) => { 
                            console.log(e.target.value)
                            setWilaya(e.target.value)}}
                        className='px-4 py-2 rounded-full text-gray-700'
                        required
                    >

                            <option value={10} >
                                                            hello
                            </option>
                       
                        {availablesWilayas.map((item, index) => (
                            <option value={item.id} key={`${index}-${item.id}`}>
                                {item.name}
                            </option>
                        ))}
                                                
                        

                        {/* Add more wilayas as needed */}
                    </select>

                    <select
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className='px-4 py-2 rounded-full text-gray-700'
                        required
                    >
                        {availableGrades.map((item, index) => (
                            <option value={item.id} key={`${index}-${item.id}`}>
                                {item.name}
                            </option>
                        ))}

                        {/* Add more grades as needed */}
                    </select>
                </>
            }


        {/* <button type='submit' className='border border-orange-400 p-2 font-semibold rounded-full duration-300
                                hover:bg-orange-400 hover:text-gray-700 '>
            {title}
        </button> */}
        <button 
    type='submit' 
    className={`border border-orange-400 p-2 font-semibold rounded-full duration-300 text-gray-700
                ${loading ? 'bg-orange-400 cursor-not-allowed' : 'hover:bg-orange-400 hover:text-gray-700'}`}
    disabled={loading} // Disable button if loading is true
>
    {loading ? (
        <span className="flex items-center justify-center">
            <svg
                className="animate-spin h-5 w-5 mr-3 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8H4z"
                />
            </svg>
            Loading...
        </span>
    ) : (
        title // Show the title when not loading
    )}
</button>
    </form>
  )
}

export default Form

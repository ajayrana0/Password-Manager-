  import React, { useEffect, useState } from 'react'
  import { useRef } from 'react';
  import { ToastContainer, toast } from 'react-toastify';
  import { v4 as uuidv4 } from 'uuid';


  const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {
      let req = await fetch("http://localhost:3000/")
      let passwords = await req.json()
      console.log(passwords)
      setpasswordArray(passwords)

    }
    useEffect(() => {
      getPasswords()

    }, [])

    const copyText = (text) => {
      toast('copy to clipboard!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigator.clipboard.writeText(text)
    }
    const showPassword = () => {
      passwordRef.current.type = "text"
      console.log(ref.current.src)
      if (ref.current.src.includes("/hidden.png")) {
        ref.current.src = "/eye.png"
        passwordRef.current.type = "text"
      } else {
        ref.current.src = "/hidden.png"
        passwordRef.current.type = "password"
      }
    }

    const savePassword = async () => {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);

      //if any id parsiset in db if deletetd
      
      


      await fetch("http://localhost:3000/", {method: "POST", headers:{"content-type": "application/json"}, body: JSON.stringify({ ...form, id: uuidv4() }) })
      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      // console.log([...passwordArray, form])
      setform({ site: "", username: "", password: "" })
      toast('Passsword save!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true, 
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    const editPassword = (id) => {
      console.log("Edit password with  id", id)
      setform({...passwordArray.filter(item => item.id === id)[0], id: id})
      setpasswordArray(passwordArray.filter(item => item.id !== id))
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    }

    const deletePassword = async (id) => {
      let c = confirm("Do you really want to delete this password?")
      if (c) {
        console.log("Deleting passwordn with  id", id)
        setpasswordArray(passwordArray.filter(item => item.id !== id))
        let res = await fetch("http://localhost:3000/", {method: "DELETE", headers:{"content-type": "application/json"}, body: JSON.stringify({ ...form, id}) })

        // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        toast('Delete password!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }

    }

    const handleChange = (e) => {
      setform({ ...form, [e.target.name]: e.target.value })
    }



    return (

      <><ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
        <div>
          <div className="fixed inset-0 -z-10 w-full min-h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

          <div className="mycontainer  max-w-7xl px-20 md:px-5 py- text-white">
            <h1 className='text-4xl font-bold text-center'>
              <span className='text-green-900 border-black'>&lt;</span>
              Pass
              <span className='text-green-900'>OP/&gt;</span>
            </h1>
            <p className='text-black w-full text-center py-5'>Your own Password manager</p>
            <div className='flex flex-col text-black gap-5 items-center'>
              <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border-2 border-gray-700 focus:border-pink-600 gap-10 px-2  py-2 w-full' type="text" name='site' id='' />
              <div className="flex flex-row gap-10 w-full">
                <input value={form.username} onChange={handleChange} placeholder='Enter Username' type="text" name='username' className='rounded-full  border-2 border-gray-700 focus:border-pink-600 px-2  py-2 basis-1/1 w-full' />
                <div className='relative'>
                  <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' type="password" name='password' className='rounded-full  border-2 border-gray-700 focus:border-pink-600 px-2  py-2 basis-1/3 w-full' />
                  <span onClick={showPassword} className='absolute right-3 top-3 justify-between cursor-pointer'>
                    <img ref={ref} width={20} src="/eye.png" alt="eye" />
                  </span>
                </div>
              </div>
              <button onClick={savePassword} className='flex justify-center items-center bg-green-700 rounded-full hover:bg-green-600 border-2 border-green-800 text-white  px-10  py-2 w-fit gap-1'>
                <lord-icon
                  src="https://cdn.lordicon.com/hqymfzvj.json"
                  trigger="hover"
                >
                </lord-icon>
                Save</button>
            </div>
            <div className="password bg-gray-900 text-white p- rounded-xl shadow-lg mt-8 ">
              <h2 className="text-3xl font-bold text-center mt-5 text-green-600">Your Passwords</h2>
              {passwordArray.length === 0 && <div className='h-30 flex items-center justify-center'>No password show</div>}
              {passwordArray.length != 0 && <div className="overflow-x-auto ">
                <table className="table-auto w-full border border-gray-700 rounded-xl overflow-hidden text-center h-25">
                  <thead className="bg-green-900 text-white">
                    <tr className="uppercase text-sm">
                      <th className="px-4 py-3 border-r border-gray-700">Website</th>
                      <th className="px-4 py-3 border-r border-gray-700">Username</th>
                      <th className="px-4 py-3">Password</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-200">
                    {passwordArray.map((item, index) => {
                      return <tr key={index} className="hover:bg-green-900 transition">
                        <td className="px-4 py-2 border-t border-gray-700"> <a href={item.site} target='_blank'>{item.site}</a>
                          <img onClick={() => { copyText(item.site); }} className='w-4 h-4 inline ml-2 cursor-pointer filter invert hover:brightness-150' src="/copy.png" alt="" /></td>
                        <td className="px-4 py-2 border-t border-gray-700">{item.username}
                          <img onClick={() => { copyText(item.username); }} className='w-4 h-4 inline ml-2 cursor-pointer filter invert hover:brightness-150' src="/copy.png" alt="" /></td>
                        <td className="px-4 py-2 border-t border-gray-700">{"*".repeat(item.password.length)}
                          <img onClick={() => { copyText(item.password); }} className='w-4 h-4 inline ml-2 cursor-pointer filter invert hover:brightness-150' src="/copy.png" alt="" /></td>
                        <td className="px-4 py-2 border-t border-gray-700 flex  items-center  justify-center">
                          <span className='text-red-500 hover:underline inline ml-2 cursor-pointer filter invert hover:brightness-150' onClick={() => { editPassword(item.id) }}>
                            <img className='w-5 h-5' src="/edit_1159633.png" alt="" />
                          </span>

                          <span className='text-red-500 hover:underline inline ml-2 cursor-pointer filter invert hover:brightness-150' onClick={() => { deletePassword(item.id) }}>
                            <img className='w-5 h-5' src="/delete_12236949.png" alt="" />
                          </span>
                        </td>

                      </tr>;
                    })}
                  </tbody>
                </table>
              </div>}
            </div>
          </div>
        </div></>
    )
  }

  export default Manager

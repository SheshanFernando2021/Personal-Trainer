// import React, { useState, useEffect } from 'react';
// import './dashboard.css';
// import { auth, db } from '../../firebase';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import { signOut } from 'firebase/auth';
// import {
//   collection,
//   query,
//   where,
//   onSnapshot,
//   addDoc,
// } from 'firebase/firestore';

// const Dashboard = () => {
//   const [chestDay, setChestDay] = useState(0);
//   const [armDay, setArmDay] = useState(0);
//   const [legDay, setLegDay] = useState(0);
//   const [backDay, setBackDay] = useState(0);
//   const [data, setData] = useState([]);
//   const navigate = useNavigate();
//   const [user] = useAuthState(auth);

//   const signOutHandler = () => {
//     signOut(auth)
//       .then(() => {
//         console.log('User signed out!');
//         navigate('/');
//       })
//       .catch((error) => {
//         console.error('Sign out error:', error);
//       });
//   };

//   useEffect(() => {
//     if (user) {
//       const q = query(
//         collection(db, 'weights'),
//         where('userId', '==', user.uid)
//       );
//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         const dataList = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setData(dataList); // Update the state with fetched data
//       });

//       return () => unsubscribe(); // Clean up subscription on unmount
//     }
//   }, [user]);

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     const newEntry = {
//       date: new Date().toLocaleDateString(), // ISO format includes time
//       chestDay,
//       armDay,
//       legDay,
//       backDay,
//       userId: user?.uid, // Ensure user is defined
//     };

//     try {
//       await addDoc(collection(db, 'weights'), newEntry);
//       console.log('Document successfully written!');
//       // Optionally update local state if you want to show the data immediately
//       setData((prevData) => [...prevData, newEntry]);
//       setArmDay(0);
//       setChestDay(0);
//       setBackDay(0);
//       setLegDay(0);
//     } catch (error) {
//       console.error('Error adding document: ', error);
//     }
//   };

//   return (
//     <>
//       {user ? (
//         <div className="dashboard-container">
//           <div className="both">
//             <h1>Dashboard</h1>

//             <div className="inputs">
//               <form onSubmit={submitHandler}>
//                 <p>Chest Day</p>
//                 <input
//                   type="number"
//                   placeholder="Chest Day"
//                   value={chestDay}
//                   onChange={(e) => setChestDay(Number(e.target.value))}
//                 />
//                 <br />
//                 <br />
//                 <br />
//                 <p>Arm Day</p>
//                 <input
//                   type="number"
//                   placeholder="Arm Day"
//                   value={armDay}
//                   onChange={(e) => setArmDay(Number(e.target.value))}
//                 />
//                 <br />
//                 <br />
//                 <br />
//                 <p>Leg Day</p>
//                 <input
//                   type="number"
//                   placeholder="Leg Day"
//                   value={legDay}
//                   onChange={(e) => setLegDay(Number(e.target.value))}
//                 />
//                 <br />
//                 <br />
//                 <br />
//                 <p>Back Day</p>
//                 <input
//                   type="number"
//                   placeholder="Back Day"
//                   value={backDay}
//                   onChange={(e) => setBackDay(Number(e.target.value))}
//                 />
//                 <br />
//                 <br />
//                 <br />

//                 <button type="submit">Add Entry</button>
//               </form>
//             </div>

//             <p
//               style={{
//                 fontWeight: 'normal',
//                 alignSelf: 'flex-start',
//                 marginLeft: 60,
//               }}
//             >
//               hover over the graph for more details
//             </p>
//             <ResponsiveContainer width="100%" height={400} p>
//               <AreaChart
//                 data={data}
//                 margin={{ top: 20, right: 60, left: 20, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" stroke="#000" />
//                 <YAxis stroke="#000" />
//                 <Tooltip />
//                 <Area
//                   type="monotone"
//                   dataKey="chestDay"
//                   stroke="#8884d8"
//                   fillOpacity={0.3}
//                   fill="#8884d8"
//                   margin={{ top: 20, right: 50, left: 20, bottom: 5 }}
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="armDay"
//                   stroke="#82ca9d"
//                   fillOpacity={0.3}
//                   fill="#82ca9d"
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="legDay"
//                   stroke="#ffc658"
//                   fillOpacity={0.3}
//                   fill="#ffc658"
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="backDay"
//                   stroke="#ff7300"
//                   fillOpacity={0.3}
//                   fill="#ff7300"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//             <button onClick={signOutHandler}>Sign Out</button>
//           </div>
//         </div>
//       ) : (
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//             height: '100vh',
//             width: '100%',
//           }}
//         >
//           <Link to="/">
//             <h3>Log Back in to See your Progress</h3>
//           </Link>
//         </div>
//       )}
//     </>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { auth, db } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { signOut } from 'firebase/auth';
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
} from 'firebase/firestore';

const Dashboard = () => {
  const [chestDay, setChestDay] = useState(0);
  const [armDay, setArmDay] = useState(0);
  const [legDay, setLegDay] = useState(0);
  const [backDay, setBackDay] = useState(0);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out!');
        navigate('/');
      })
      .catch((error) => {
        console.error('Sign out error:', error);
      });
  };

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, 'weights'),
        where('userId', '==', user.uid)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const dataList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(dataList); // Update the state with fetched data
      });

      return () => unsubscribe(); // Clean up subscription on unmount
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validation: Check if at least one field has a value greater than 0
    if (chestDay > 0 || armDay > 0 || legDay > 0 || backDay > 0) {
      const newEntry = {
        date: new Date().toLocaleDateString(), // ISO format includes time
        chestDay,
        armDay,
        legDay,
        backDay,
        userId: user?.uid, // Ensure user is defined
      };

      try {
        await addDoc(collection(db, 'weights'), newEntry);
        console.log('Document successfully written!');
        // Optionally update local state if you want to show the data immediately
        setData((prevData) => [...prevData, newEntry]);
        setArmDay(0);
        setChestDay(0);
        setBackDay(0);
        setLegDay(0);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    } else {
      alert('Please enter a value for at least one field.');
    }
  };

  return (
    <>
      {user ? (
        <div className="dashboard-container">
          <div className="both">
            <h1>Dashboard</h1>

            <div className="inputs">
              <form onSubmit={submitHandler}>
                <div className="onlyinputs">
                  <div className="set"> <p>Chest Day</p>
                    <input
                      type="number"
                      placeholder="Chest Day"
                      value={chestDay}
                      onChange={(e) => setChestDay(Number(e.target.value))}
                    /></div>

                  <div className="set"> <p>Arm Day</p>
                    <input
                      type="number"
                      placeholder="Arm Day"
                      value={armDay}
                      onChange={(e) => setArmDay(Number(e.target.value))}
                    /></div>

                  <div className="set"> <p>Leg Day</p>
                    <input
                      type="number"
                      placeholder="Leg Day"
                      value={legDay}
                      onChange={(e) => setLegDay(Number(e.target.value))}
                    />
                  </div>
                  <div className="set"> <p>Back Day</p>
                    <input
                      type="number"
                      placeholder="Back Day"
                      value={backDay}
                      onChange={(e) => setBackDay(Number(e.target.value))}
                    /></div>
                </div>

                <br />
                <br />

                <button type="submit">Add Entry</button>
              </form>
            </div>

            <p
              style={{
                fontWeight: 'normal',
                fontSize: 13.5,
              }}
            >
              hover over the graph for more details. (Y axis is weight , X axis
              is date)
            </p>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart
                data={data}
                margin={{ top: 20, right: 60, left: 50, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#000" tick={{ fontSize: 12 }} />
                <YAxis stroke="#000" tick={{ fontSize: 12 }} value="kg" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="chestDay"
                  stroke="#8884d8"
                  fillOpacity={0.3}
                  fill="#8884d8"
                  fontSize={12}
                />
                <Area
                  type="monotone"
                  dataKey="armDay"
                  stroke="#82ca9d"
                  fillOpacity={0.3}
                  fill="#82ca9d"
                />
                <Area
                  type="monotone"
                  dataKey="legDay"
                  stroke="#ffc658"
                  fillOpacity={0.3}
                  fill="#ffc658"
                />
                <Area
                  type="monotone"
                  dataKey="backDay"
                  stroke="#ff7300"
                  fillOpacity={0.3}
                  fill="#ff7300"
                />
              </AreaChart>
            </ResponsiveContainer>
            <button onClick={signOutHandler}>Sign Out</button>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%',
          }}
        >
          <div className="out">
            <Link to="/">
              <h3>click here to Log Back in to See your Progress</h3>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

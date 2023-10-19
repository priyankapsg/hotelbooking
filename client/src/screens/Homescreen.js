import { getAllRooms } from "../actions/roomActions";
import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [formdate , setfromdate] = useState();
  const [todate , settodate] = useState();
  const [duplicaterooms , setduplicaterooms] = useState([]);
  const [searchkey,setsearchkey] = useState('');
  const [searchCity,setSearchCity] = useState('');
  const [type,settype] = useState('all')
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
      try {
        setloading(true);
        // const data = dispatch(getAllRooms)
        const data = (await axios.get("/api/rooms/getallrooms")).data;

        setrooms(data);
        setduplicaterooms(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    }
    fetchData();
  }, []);

  function filterByDate(dates) {
    setfromdate(moment(dates[0]).format('DD-MM-YYYY'))
    settodate(moment(dates[1]).format('DD-MM-YYYY'))

    var temprooms = []
    var availablity = false;

    for (const room of duplicaterooms) {
      
      if(room.currentbookings.length > 0){
          for( var booking of room.currentbookings){
            if(!moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate , booking.todate)
            && !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromdate , booking.todate)
            ){

              if(
                moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
                moment(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
                moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
                moment(dates[1]).format('DD-MM-YYYY') !== booking.todate
                ){
                      availablity = true;
              }
            }
            setrooms(temprooms)
          }
      }

      if(availablity === true || room.currentbookings.length === 0){
        temprooms.push(room)
      }
      
    }
  }

  function filterBySearch(){
    const temprooms = duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))
    setrooms(temprooms);
  }

  function filterByCity(){
    const temprooms = duplicaterooms.filter(room=>room.location.toLowerCase().includes(searchCity.toLowerCase()))
    setrooms(temprooms);
  }

  function filterByType(e) {

    settype(e);

    if (e!=='all') {
      const temprooms = duplicaterooms.filter(room=>room.type.toLowerCase()===e.toLowerCase())
      setrooms(temprooms);
    }
    else{
      setrooms(duplicaterooms)
    }
  }
  return (
    <div className="container">

      <div className="row mt-5 booking-container">
        <div className="col-md-5">
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
        </div>

        <div className="col-md-5">
          <input type="text" className="form-control" placeholder="Search Room" 
          value={searchkey} onChange={(e)=>{ setsearchkey(e.target.value) }} onKeyUp={filterBySearch} />
        </div>

        <div className="col-md-5">
          <input type="text" className="form-control" placeholder="Search Location" 
          value={searchCity} onChange={(e)=>{ setSearchCity(e.target.value) }} onKeyUp={filterByCity} />
        </div>

      <div className="col-md-3">
      <select className="form-control" value={type} onChange={(e)=>{ filterByType(e.target.value)}}>
          <option value="all">All</option>
          <option value="delux">Delux</option>
          <option value="non_delux">Non-Delux</option>
          <option value="party_hall">Party-Hall</option>
        </select>
      </div>
      </div>



      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader/>
        ) : (
          rooms.map((room) => {
            return  <div className="col-md-9 mt-2 mb-4" >
              <Room room={room} fromdate={formdate} todate={todate} />
            </div>;
        }) 
        )}
      </div>
    </div>
  );
}

export default Homescreen;

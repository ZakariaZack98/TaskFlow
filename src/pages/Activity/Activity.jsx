import React, { useEffect, useState } from 'react';
import ActivitySection from '../../components/common/ActivitySection';
import { get, ref } from 'firebase/database';
import { auth, db } from '../../../Database/FirebaseConfig';

const Activity = () => {
  const [activityDataArr, setActivityDataArr] = useState([]);
  const [datesArr, setDatesArr] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const activityRef = ref(db, `activity/${auth.currentUser?.uid}`);
    get(activityRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          const collectedData = [];
          snapshot.forEach(activitySnapshot => {
            collectedData.push(activitySnapshot.val());
          });
          setActivityDataArr(collectedData.sort((a, b) => b.timeStamp - a.timeStamp));
          return collectedData;
        }
      })
      .then(collectedData => {
        setDatesArr(
          Array.from(new Set([...collectedData.map(activity => new Date(activity.timeStamp).toDateString())]))
        );
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-6/10 h-full mx-auto">
      {loading ? (
        <div className="w-full h-full flex flex-col gap-4 p-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
              <div className="flex flex-col w-full">
                <div className="w-3/4 h-4 bg-gray-300 animate-pulse rounded"></div>
                <div className="w-1/2 h-3 bg-gray-300 animate-pulse rounded mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : activityDataArr.length > 0 ? (
        <>
          <h1 className="text-3xl font-bold">Activity Log</h1>
          <div className="flex flex-col my-5 h-9/10 overflow-y-scroll" style={{ scrollbarWidth: 'none' }}>
            {datesArr?.map(date => (
              <ActivitySection key={date} date={date} activityDataArr={activityDataArr.filter(activity => new Date(activity.timeStamp).toDateString() === date)} />
            ))}
          </div>
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-gray-500 text-lg">No activity found</p>
        </div>
      )}
    </div>
  );
};

export default Activity;
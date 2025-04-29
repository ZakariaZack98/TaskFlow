import { AiOutlineClose } from "react-icons/ai";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { PiDotsThreeOutline } from "react-icons/pi";

const _ = {};
_.projects = ['Personal', 'Shopping', 'Works', 'Errands'];
_.priorities = [
    {
      level: 1,
      color: 'red'
    },
    {
      level: 2,
      color: 'orange'
    },
    {
      level: 3,
      color: 'blue'
    },
    {
      level: 4,
      color: 'green'
    },
  ]
_.taskPageIcons = [
    {
      name: "prevTask",
      icon: FaAngleUp,
    },
    {
      name: "nextTask",
      icon: FaAngleDown,
    },
    {
      name: "options",
      icon: PiDotsThreeOutline,
    },
    {
      name: "closePopup",
      icon: AiOutlineClose,
    },
  ];

  _.dummyComments = [
    {
      id: 123198231782,
      text: "Lorem ipsum dolor sit amet, consectetur r incididunt ut labore et dolore magna aliqua.",
      imgUrl: "https://wpcdn.us-east-1.vip.tn-cloud.net/www.hawaiimagazine.com/content/uploads/2020/12/plumeria-2-Eric-Tessmer-Flickr-1024x708.jpg",
      createdAt: "04 24 2025 12:55:00 pm",
      commenterId: 'asd6a8sdhasdhad77'
    },
    {
      id: 123198231782,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imgUrl: "https://i0.wp.com/www.southsideblooms.com/wp-content/uploads/2023/01/pexels-lisa-2106037.jpg?w=1200&ssl=1",
      createdAt: "04 24 2025 12:55:00 pm",
      commenterId: 'asd6a8sdhasdhad77'
    },
  ]

  _.dummyTaskArr = [
    {
      id: Date.now(),
      title: 'Buy Groceries',
      desc: 'Buy groceries including rice, daal, vegetables, sugar etc. daily supplies',
      date: '04 29 2025',
      reminder: '04 29 2025 05:33 pm',
      place: 'At Shwapno Supershop',
      deadline: '04 30 2025',
      category: 'Personal',
      status: 'Pending',
      comments: [
        {
          text: 'this is the shopping list',
          imgUrl: 'https://dummyimage.com/dummypic.jpeg',
        },
      ],
      activity: [
        {
          time: '04 29 2025 08:33:32 am',
          activity: 'added a comment to the task',
        },
      ],
    },
    {
      id: Date.now() + 1,
      title: 'Team Meeting',
      desc: 'Monthly sync-up with the project team. Discuss milestones and blockers.',
      date: '04 29 2025',
      reminder: '04 29 2025 10:00 am',
      place: 'Zoom',
      deadline: '04 29 2025',
      category: 'Work',
      status: 'Pending',
      comments: [
        {
          text: 'Prepare the project report before meeting.',
          imgUrl: 'https://dummyimage.com/meeting-pic.jpeg',
        },
      ],
      activity: [
        {
          time: '04 29 2025 09:00:00 am',
          activity: 'added a reminder for the task',
        },
      ],
    },
    {
      id: Date.now() + 2,
      title: 'Doctor Appointment',
      desc: 'Regular check-up appointment with Dr. Anwar.',
      date: '04 29 2025',
      reminder: '04 29 2025 03:00 pm',
      place: 'Square Hospital, Dhanmondi',
      deadline: '04 29 2025',
      category: 'Personal',
      status: 'Pending',
      comments: [
        {
          text: 'Bring previous prescriptions.',
          imgUrl: 'https://dummyimage.com/health-record.jpeg',
        },
      ],
      activity: [
        {
          time: '04 29 2025 07:30:00 am',
          activity: 'created the task',
        },
      ],
    },
    {
      id: Date.now() + 3,
      title: 'Read Book: Atomic Habits',
      desc: 'Read chapters 4 to 6 and take notes.',
      date: '04 29 2025',
      reminder: '04 29 2025 08:00 pm',
      place: 'Home Reading Corner',
      deadline: '04 30 2025',
      category: 'Personal',
      status: 'Pending',
      comments: [
        {
          text: 'Chapter 4 is about systems vs goals.',
          imgUrl: 'https://dummyimage.com/notes-pic.jpeg',
        },
      ],
      activity: [
        {
          time: '04 29 2025 10:15:00 am',
          activity: 'updated task with new reading chapters',
        },
      ],
    },
  ];
  

  export default _;
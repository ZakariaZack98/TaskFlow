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

  export default _;
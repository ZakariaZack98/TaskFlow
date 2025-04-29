import moment from 'moment';
import React from 'react'

const CommentCard = ({commentData}) => {
  const {id, text, imgUrl, createdAt, commenterId } = commentData;
  return (
    <div className="comment px-4 pb-2">
      <div className="heading flex justify-between items-center">
        <div className="flex gap-x-4">
          {/* Name and picture will be fecthed form commenterID or auth */}
          <picture>
            <img
              src={
                "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
              }
              className="w-10 h-10 rounded-full object-cover object-center"
            />
          </picture>
          <div className="commentSec w-[80%]">
            <div className="userSec">
              <div className="flex items-center gap-x-4">
                <p className="font-semibold">{"Sadee MD Zakaria"}</p>
                <span className="text-sm">{moment(createdAt).fromNow() || '02:38 PM Today'}</span>
              </div>
            </div>
            <p className="mb-3 text-fontSecondery">{text || 'Ut ut magna aute eiusmod eiusmod aute non.'}</p>
            <picture>
              <img src={imgUrl || 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zmxvd2Vyc3xlbnwwfHwwfHx8MA%3D%3D'} alt="" className="rounded-2xl max-w-2/3" />
            </picture>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentCard
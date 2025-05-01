import moment from 'moment';
import React from 'react'
import { auth } from '../../../Database/FirebaseConfig';

const CommentCard = ({ commentData }) => {
  const { id, text, imgUrl, createdAt, commenterId } = commentData;
  return (
    <div className="comment px-4 pb-2 w-full">
      <div className="heading flex justify-between items-center">
        <div className="flex gap-x-4">
          {/* Name and picture will be fecthed form commenterID or auth */}
          <picture className='min-w-10'>
            <img
              src={ auth.currentUser?.photoURL ||
                "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
              }
              className="w-10 h-10 rounded-full object-cover object-center"
            />
          </picture>
          <div className="commentSec min-w-[70%]">
            <div className="userSec">
              <div className="flex items-center gap-x-4">
                <p className="font-semibold">{auth.currentUser.displayName || "Sadee MD Zakaria"}</p>
                <span className="text-sm">{moment(createdAt).fromNow() || '02:38 PM Today'}</span>
              </div>
            </div>
            <p className="mb-3 text-fontSecondery">{text || 'Ut ut magna aute eiusmod eiusmod aute non.'}</p>
            {
              imgUrl && imgUrl.length !== 0 && (
                <picture>
                  <img src={imgUrl} alt="" className="rounded-2xl max-w-2/3" />
                </picture>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentCard
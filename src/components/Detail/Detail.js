import Modal from '@material-ui/core/Modal';
import Clear from '@material-ui/icons/Clear';
import './Detail.css'

const Detail = ({detailData, isOpen, setIsShowDetailModal}) => {
  return (
    <Modal
      open={isOpen}
      onClose={()=>setIsShowDetailModal(!isOpen)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    > 
      
      <div className="container-modal">
        <div className="title-modal">
          <span> Patient Data </span>
          <Clear className="cross" onClick={()=>setIsShowDetailModal(!isOpen)}/>
        </div>
        <div className="layout">
          <div>
            <div className="detail-modal">  
              <div className="heading">
                Name : 
              </div>
              <div className="heading-content">
                {detailData.name} {detailData.surname}
              </div>
            </div>
            <div className="detail-modal">
              <div className="heading">
                Age: 
              </div>
              <div className="heading-content">
                {detailData.age}
              </div>
            </div>
            <div className="detail-modal">
              <div className="heading">
                Disease: 
              </div>
              <div className="heading-content">
                {detailData.disease}
              </div>
            </div>
            <div className="detail-modal">
              <div className="heading">
                Contact Information: 
              </div>
              <div className="heading-content">
                {detailData.contactNumber}
              </div>
            </div>
            <div className="detail-modal">
              <div className="heading">
                Birth Date: 
              </div>
              <div className="heading-content">
                {detailData.birthMonth}/{detailData.birthDate}/{detailData.birthYear}
              </div>
            </div>
            <div className="detail-modal">
              <div className="heading">
                Address: 
              </div>
              <div className="heading-content">
                {detailData.address}
              </div>
            </div>
          </div>
          <div>
            {detailData.pic.length > 0 && 
            <div className="heading-content">
              <img alt="" src={detailData.pic} width={80} height={80} />
            </div>  
            }
          </div>
        </div> 
      </div>
    </Modal>
  )
}
export default Detail
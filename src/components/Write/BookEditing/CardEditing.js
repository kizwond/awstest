import React, { Component } from 'react'
import './EditorTry.css'
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/plugins.pkgd.min.css'
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/js/languages/ko'
import 'froala-editor//css/themes/gray.min.css'

import FroalaEditorComponent from 'react-froala-wysiwyg';
// import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

import axios from 'axios'
import { Modal } from 'antd'
import { EditOutlined } from '@ant-design/icons';
import Button from '../../styledComponents/defaultButton'

export class CardEditing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible:false,
      card_add:false,
      arrayForEditor:[],
      current_card_type:'',
      current_card:{},
      flag:'',
      editor1: '',
      editor2: '',
      editor3: '',
      editor4: '',
      editor5: '',
      editor6: '',
      editor7: '',
      editor8: '',
      editor9: '',
      editor10: '',
      editor11: '',
      editor12: '',
      editor13: '',
      editor14: '',
      editor15: '',
    }
  }
  handleModelChangeFlag = (e) => {
    console.log(e.target.value)
    this.setState({
      flag: e.target.value
    })
  }

  handleModelChangeEditor1 = (model) => {
    console.log('editor1:',model)
    this.setState({
      editor1: model
    })
  }
  handleModelChangeEditor2 = (model) => {
    console.log('editor2:',model)
    this.setState({
      editor2: model
    })
  }
  handleModelChangeEditor3 = (model) => {
    console.log('editor3:',model)
    this.setState({
      editor3: model
    })
  }
  handleModelChangeEditor4 = (model) => {
    console.log('editor4:',model)
    this.setState({
      editor4: model
    })
  }

  handleModelChangeEditor5 = (model) => {
    console.log('editor5:',model)
    this.setState({
      editor5: model
    })
  }

  handleModelChangeEditor6 = (model) => {
    console.log('editor6:',model)
    this.setState({
      editor6: model
    })
  }

  handleModelChangeEditor7 = (model) => {
    console.log('editor7:',model)
    this.setState({
      editor7: model
    })
  }

  handleModelChangeEditor8 = (model) => {
    console.log('editor8:',model)
    this.setState({
      editor8: model
    })
  }

  handleModelChangeEditor9 = (model) => {
    console.log('editor9:',model)
    this.setState({
      editor9: model
    })
  }

  handleModelChangeEditor10 = (model) => {
    console.log('editor10:',model)
    this.setState({
      editor10: model
    })
  }

  handleModelChangeEditor11 = (model) => {
    console.log('editor11:',model)
    this.setState({
      editor11: model
    })
  }

  handleModelChangeEditor12 = (model) => {
    console.log('editor12:',model)
    this.setState({
      editor12: model
    })
  }

  handleModelChangeEditor13 = (model) => {
    console.log('editor13:',model)
    this.setState({
      editor13: model
    })
  }

  handleModelChangeEditor14 = (model) => {
    console.log('editor14:',model)
    this.setState({
      editor14: model
    })
  }

  handleModelChangeEditor15 = (model) => {
    console.log('editor15:',model)
    this.setState({
      editor15: model
    })
  }

  handleSubmit = () => {
    console.log('111:',this.state.current_card)
    const current = this.state.current_card
    console.log(current)
    if(current){
      if(current.face1){
        var face1 = current.face1
      }
      if(current.selection){
        var selection = current.selection
      }
      if(current.face2){
        var face2 = current.face2
      }
      if(current.share){
        var share = current.share
      }
      if(current.annot){
        var annot = current.annot
      }
      if(current.none){
        var none = current.none
      }
    }
    const face1_array = [];
    const selection_array = [];
    const face2_array = [];
    const share_array = [];
    const annotation_array = [];
    const none_array = [];

    //읽기카드만 있을때
    if (face1 && !face2 && !annot && !selection && !share && !none){
      for (var i = 1; i < face1+1; i++) {
        face1_array.push(this.state['editor'+i])
      }
    }
    
    //읽기카드랑 주석이 있을때
    if (face1 && annot && !face2 && !selection && !share && !none){
      for ( i = 1; i < face1+1; i++) {
        face1_array.push(this.state['editor'+i])
      }
      if(annot){
        for ( i = face1+1; i < face1+annot+1; i++) {
          annotation_array.push(this.state['editor'+i])
        }
      }
    }
    
    //뒤집기카드만 있을때
    if (face1 && face2 && !annot && !selection && !share && !none){
      for ( i = 1; i < face1+1; i++) {
        face1_array.push(this.state['editor'+i])
      }
      if(face2){
        for ( i = face1+1; i < face1+face2+1; i++) {
          face2_array.push(this.state['editor'+i])
        }
      }
    }

    //뒤집기카드랑 주석이 있을때
    if (face1 && face2 && annot && !selection && !share && !none){
      for ( i = 1; i < face1+1; i++) {
        face1_array.push(this.state['editor'+i])
      }
      if(face2){
        for ( i = face1+1; i < face1+face2+1; i++) {
          face2_array.push(this.state['editor'+i])
        }
      }
      if(annot){
        for ( i = face1+face2+1; i < face1+face2+annot+1; i++) {
          annotation_array.push(this.state['editor'+i])
        }
      }
    }
    //뒤집기카드랑 보기가 있을때
    if (face1 && face2 && !annot && selection && !share && !none){
      for ( i = 1; i < face1+1; i++) {
        face1_array.push(this.state['editor'+i])
      }
      if(selection){
        for ( i = face1+1; i < face1+selection+1; i++) {
          selection_array.push(this.state['editor'+i])
        }
      }
      if(face2){
        for ( i = face1+selection+1; i < face1+selection+face2+1; i++) {
          face2_array.push(this.state['editor'+i])
        }
      }
    }

    //뒤집기카드랑 보기랑 주석이 있을때
    if (face1 && face2 && annot && selection && !share && !none){
      for ( i = 1; i < face1+1; i++) {
        face1_array.push(this.state['editor'+i])
      }
      if(selection){
        for ( i = face1+1; i < face1+selection+1; i++) {
          selection_array.push(this.state['editor'+i])
        }
      }
      if(face2){
        for ( i = face1+selection+1; i < face1+selection+face2+1; i++) {
          face2_array.push(this.state['editor'+i])
        }
      }
      if(annot){
        for ( i = face1+selection+face2+1; i < face1+selection+face2+annot+1; i++) {
          annotation_array.push(this.state['editor'+i])
        }
      }
    }

    //공통지문카드만 있을때
    if (share && !face1 && !face2 && !annot && !selection && !none){
      for ( i = 1; i < share+1; i++) {
        share_array.push(this.state['editor'+i])
      }
    }

    //공통지문카드와 주석이 있을때
    if (share && !face1 && !face2 && annot && !selection && !none){
      for ( i = 1; i < share+1; i++) {
        share_array.push(this.state['editor'+i])
      }
      if(annot){
        for ( i = share+1; i < share+annot+1; i++) {
          annotation_array.push(this.state['editor'+i])
        }
      }
    }

    //비학습카드만 있을때
    if (none && !share && !face1 && !face2 && !annot && !selection){
      for ( i = 1; i < none+1; i++) {
        none_array.push(this.state['editor'+i])
      }
    }

    //비학습카드와 주석이 있을때
    if (none && !share && !face1 && !face2 && annot && !selection){
      for ( i = 1; i < none+1; i++) {
        none_array.push(this.state['editor'+i])
      }
      if(annot){
        for ( i = none+1; i < none+annot+1; i++) {
          annotation_array.push(this.state['editor'+i])
        }
      }
    }

    console.log(face1_array)
    console.log(face2_array)
    console.log(this.props.card_type)
    console.log(this.state.flag)
    const book_id = sessionStorage.getItem('book_id')
    axios.post('api/card/update-card', {
      book_id : book_id,
      card_id : this.props.card_id,
      cardtype_id:this.props.content.cardtype_id._id,
      index_id:this.props.index_id,
      flag_of_maker : [Number(this.state.flag)],
      share : share_array,
      face1 : face1_array,
      selection : selection_array,
      face2 : face2_array,
      annotation : annotation_array,
      parent_card_id:null
    })
    .then(res => {
      console.log('after submit:', res.data)
      this.props.updateContentsState(res.data.cardlist)
    })
    .catch(function (error) {
      console.log(error);
    });
    this.setState({visible:false})
  }

  showModal = () => {
    this.setState({visible:true});
  };

  handleOk = () => {
    this.props.updateContentsListState()
    this.setState({visible:false});
  };

  handleCancel = () => {
    this.props.updateContentsListState()
    this.setState({visible:false});
  };

  addCardHandler = () => {
    console.log('content : ', this.props.content)
    const { content } = this.props
    const cardType = content.cardtype_id.type
    const selectionLength = content.cardtype_id.num_of_row.selection
    console.log(cardType)


        if (cardType === 'read') {
            const faceLength_1 = content.cardtype_id.num_of_row.face1
            const annotLength = content.cardtype_id.num_of_row.annotation
            const face_array = []
            for ( var i = 1; i < faceLength_1+1; i++) {
              face_array.push('1면'+i+'행')
              this.setState({ [`editor${i}`]:content.contents.face1[i-1] });
            }
            for ( i = 1; i < annotLength+1; i++) {
              face_array.push('주석')
              this.setState({ [`editor${i+faceLength_1}`]:content.contents.annotation[i-1] });
            }
            console.log(face_array)
            this.setState({
              current_card: {'face1':faceLength_1,'annot':annotLength},
              current_card_type:content._id,
              flag:content.contents.maker_flag[0]
            })
            var contentsList = face_array
          } else if (cardType === 'flip-normal') {
            if(selectionLength > 0){
              const faceLength_1 = content.cardtype_id.num_of_row.face1
              const faceLength_2 = content.cardtype_id.num_of_row.face2
              const annotLength = content.cardtype_id.num_of_row.annotation
              const face_array = []
              for ( i = 1; i < faceLength_1+1; i++) {
                face_array.push('1면'+i+'행')
                this.setState({ [`editor${i}`]:content.contents.face1[i-1] });
              }
              for ( i = 1; i < selectionLength+1; i++) {
                face_array.push('보기'+i+'행')
                this.setState({ [`editor${i+faceLength_1}`]:content.contents.selection[i-1] });
              }
              for ( i = 1; i < faceLength_2+1; i++) {
                face_array.push('2면'+i+'행')
                this.setState({ [`editor${i+faceLength_1+selectionLength}`]:content.contents.face2[i-1] });
              }
              for ( i = 1; i < annotLength+1; i++) {
                face_array.push('주석')
                this.setState({ [`editor${i+faceLength_1+selectionLength+faceLength_2}`]:content.contents.annotation[i-1] });
              }
              console.log(face_array)
              
              this.setState({
                current_card: {'face1':faceLength_1,'selection':selectionLength,'face2':faceLength_2,'annot':annotLength},
                current_card_type:content._id,
                flag:content.contents.maker_flag[0]
              })
              contentsList = face_array

            }else {
              const faceLength_1 = content.cardtype_id.num_of_row.face1
              const faceLength_2 = content.cardtype_id.num_of_row.face2
              const annotLength = content.cardtype_id.num_of_row.annotation
              const face_array = []
              for ( i = 1; i < faceLength_1+1; i++) {
                face_array.push('1면'+i+'행')
                this.setState({ [`editor${i}`]:content.contents.face1[i-1] });
              }
              for ( i = 1; i < faceLength_2+1; i++) {
                face_array.push('2면'+i+'행')
                this.setState({ [`editor${i+faceLength_1}`]:content.contents.face2[i-1] });
              }
              for ( i = 1; i < annotLength+1; i++) {
                face_array.push('주석')
                this.setState({ [`editor${i+faceLength_1+faceLength_2}`]:content.contents.annotation[i-1] });
              }
              console.log(face_array)
              console.log('where?',content.contents.maker_flag[0])
              this.setState({
                current_card: {'face1':faceLength_1,'face2':faceLength_2,'annot':annotLength},
                current_card_type:content._id,
                flag:content.contents.maker_flag[0]
              })
              contentsList = face_array
            }
            
          } else if (cardType === 'share') {
            const shareLength = content.cardtype_id.num_of_row.share
            const annotLength = content.cardtype_id.num_of_row.annotation
            const face_array = []
            for ( i = 1; i < shareLength+1; i++) {
              face_array.push('공통'+i+'행')
              this.setState({ [`editor${i}`]:content.contents.share[i-1] });
            }
            for ( i = 1; i < annotLength+1; i++) {
              face_array.push('주석')
              this.setState({ [`editor${i+shareLength}`]:content.contents.annotation[i-1] });
            }
            console.log(face_array)
            this.setState({
              current_card: {'share':shareLength,'annot':annotLength},
              current_card_type:content._id,
              flag:[]
            })
            contentsList = face_array

          } else if (cardType === 'none') {
            const noneLength = content.cardtype_id.num_of_row.none
            const annotLength = content.cardtype_id.num_of_row.annotation
            const face_array = []
            for ( i = 1; i < noneLength+1; i++) {
              face_array.push('비학습카드')
              this.setState({ [`editor${i}`]:content.contents.none[i-1] });
            }
            for ( i = 1; i < annotLength+1; i++) {
              face_array.push('주석')
              this.setState({ [`editor${i+noneLength}`]:content.contents.annotation[i-1] });
            }
            console.log(face_array)
            this.setState({
              current_card: {'none':noneLength,'annot':annotLength},
              current_card_type:content._id,
              flag:[]
            })
            contentsList = face_array
          }     
    

    // var filtered = contentsList.filter(function(x) {
    //   return x !== undefined;
    // });
    const finalArray = contentsList
    console.log('finalArray: ',finalArray)
      this.setState({
        card_add: true,
        arrayForEditor:finalArray
      })

      this.showModal()
  }

  render() {

    const editorList = this.state.arrayForEditor.map((item,index)=>{
      console.log(item)
      const config={
        editorClass:"editor_try",
        quickInsertEnabled: false,
        imageUploadURL: 'api/create/upload_image',
        saveParam: 'content',
        width: 'auto',
        theme: "gray",
        tabSpaces: 4,
        toolbarContainer: `.toolbarcontainer`,
        attribution: false,
        charCounterCount: false,
        language: 'ko',
        toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'subscript', 'superscript', 
                         'fontFamily', 'fontSize', 'color', 
                         'align', 'formatOL', 'formatUL', 'outdent', 'indent',
                         'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', 
                         'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting',
                         'help', 'html', 'undo', 'redo'],
      }
      return (
                <div key={index} style={{display:"flex", marginTop:"5px", alignItems:"center"}}>
                  <label className="editor_label" style={{width:"80px"}}>{item}</label>
                  <FroalaEditorComponent
                    tag='textarea'
                    config={config}
                    model={this.state['editor'+(index+1).toString()]}
                    onModelChange={this['handleModelChangeEditor'+(index+1).toString()]}
                    width={100}
                  />
                </div>
        )
      })

    return (
      <>
      <Button size="small" onClick={this.addCardHandler} icon={<EditOutlined />}>내용 편집</Button>
      <Modal title="카드 편집" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} width={900}>
        <div id="editor" style={{border:"1px solid black", borderRadius:"10px"}}>
          <div className='toolbarcontainer'></div>
          <div style={{padding:"10px"}}>
            <div style={{display:"flex", alignItems:"center"}}>
              {this.state.flag ? <> <label className="editor_label" style={{width:"80px"}}>사용자플래그  </label>
              <input type="number" maxLength="1" onChange={this.handleModelChangeFlag} value={this.state.flag} style={{border:"1px solid lightgrey", borderRadius:"5px", width:"50px"}}/>숫자 1 ~ 5 </>: ''}
            </div>
            {editorList}
          </div>
          <Button onClick={this.handleSubmit} id="saveButton">Save</Button>
        </div>
      </Modal>
      
      </>
    )
  }
}

export default CardEditing

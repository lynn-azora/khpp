import React, { Component } from 'react'
import {Card,Row,Col,Modal} from 'antd'
import './ui.less'

export default class Gallery extends Component {
    state = {
        visible:false
    }
    openGallery = imgSrc => {
        this.setState({
            visible:true,
            currentImg:'/gallery/'+imgSrc
        })
    }
    render() {
        const imgs = [
            ['1.png','2.png','3.png','4.png','5.png'],
            ['6.png','7.png','8.png','9.png','10.png'],
            ['11.png','12.png','13.png','14.png','15.png'],
            ['16.png','17.png','18.png','19.png','20.png'],
            ['21.png','22.png','23.png','24.png','25.png']
        ];
        const imgList = imgs.map((list)=>list.map(item=>(
            <Card
                style={{marginBottom:10}}
                cover={<img src={'/gallery/'+item} alt=""/>} //cover 卡片封面
                onClick={()=>this.openGallery(item)}
            >
                <Card.Meta
                    title = "React Admin"
                    description = "I love lynn"
                />
            </Card>
        )))
        return (
            <div className='card-wrap'>
                {/* gutter 设置间隙 */}
                <Row gutter={10}>
                    {/* md	≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象 */}
                    <Col md={5}>
                        {imgList[0]}
                    </Col>
                    <Col md={5}>
                        {imgList[1]}
                    </Col>
                    <Col md={5}>
                        {imgList[2]}
                    </Col>
                    <Col md={5}>
                        {imgList[3]}
                    </Col>
                    <Col md={5}>
                        {imgList[4]}
                    </Col>
                </Row>
                <Modal
                    width={300}
                    height={500}
                    visible={this.state.visible}
                    title="图片画廊"
                    onCancel = {()=>{
                        this.setState({
                            visible:false
                        })
                    }}
                    footer={null}
                >
                    <img src={this.state.currentImg} style={{width:'100%'}} alt=""/>
                </Modal>
            </div>
        )
    }
}

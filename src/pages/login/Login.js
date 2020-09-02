import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Form, Icon, Input, Button, Row, Col } from "antd";
import authAction from "../../redux/actions/authAction";
import config from "../../config/base.conf";
import "./login.scss";

@withRouter
@connect(
  null,
  {
    authRequest: authAction.authRequest
  }
)
class Login extends Component {
  componentWillReceiveProps(nextProps) {}
  componentDidMount() {}
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.authRequest({ 
          username: values.userName,
          loginType:"1",
          client:"web",
          password: values.password,
          appClient:"SimpleTaxManage",
          deviceNum: (Math.random() * 1000) + new Date().getTime() + 'jsb'
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-container">
        <div className="block-modal">
          {/* <div className="bm-content" />
          <div className="cn-title">
            <span>{config.subTitle}</span>
          </div>
          <div className="en-title">
            <span>{config.enTitle}</span>
          </div> */}
          {/* <div className="copyright">
            <span>{config.copyright}</span>
          </div> */}
        </div>
        {/* <img src={LOGIN} alt="" className="img-logo" /> */}
        <div className="lc-content">
          <div className="content-wrapper">
            <div className="top-title">
              <div className="logo-wrapper">
                <img src={config.logo} alt="" />
              </div>
              <span className="title">{`${config.company}`}</span>
              <div className="welcome-wrapper">
                <span className="welcome">欢迎登录</span>
              </div>
            </div>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator("userName", {
                  rules: [{ required: true, message: "请输入手机号码 !" },
                {pattern: new RegExp(/^1[3456789]\d{9}$/),message:"请输入正确的手机号码 !" }
                ]
                })(<Input style={{ width: "100%" }} size="large" prefix={<Icon type="user" style={{ fontSize: "2rem", color: "rgba(0,0,0,.25)" }} />} placeholder="手机号码" />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "请输入密码 !" }]
                })(<Input.Password size="large" prefix={<Icon type="lock" style={{ fontSize: "2rem", color: "rgba(0,0,0,.25)" }} />} placeholder="密码" />)}
              </Form.Item>
              <Form.Item>
                <Button size="large" type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
              </Form.Item>
            </Form>
            <div className="copyright">
              <span>{config.copyright}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const LoginForm = Form.create({ name: "login" })(Login);

export default LoginForm;

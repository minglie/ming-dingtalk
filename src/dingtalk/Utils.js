'use strict';

const CryptoJS=require("crypto-js")

const utils = {

  _randomString(size = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const max = chars.length;
    let ret = '';
    for (let i = 0; i < size; i++) {
      ret += chars.charAt(Math.floor(Math.random() * max));
    }
    return ret;
  },

    /**
     * 获取签名信息
     * @param {*} ticket
     * @param {*} nonce
     * @param {*} timeStamp
     * @param {*} url
     */
     sign(ticket, nonceStr, timeStamp, url) {
        let plainTex = "jsapi_ticket=" + ticket + "&noncestr=" + nonceStr + "&timestamp=" + timeStamp + "&url=" + url;
        let signature = CryptoJS.SHA1(plainTex).toString();
        return signature;
     },

  /**
   * 通过URL直接生成 JSAPI 签名
   * @param {String} ticket - JSON ticket
   * @param {String} url - 被签名链接
   *
   * @return {String} 签名
   */
  getSign(ticket, url) {
    const result = {};
    const timeStamp = result.timeStamp = new Date().getTime();
    const nonceStr = result.nonceStr = this._randomString(6);
   // result.ticket = ticket;
    result.url = url;
    result.signature = utils.sign(ticket, nonceStr, timeStamp, url);
    return result;
  },

  /**
   * 生成文字消息体
   *
   * @param {String} content - 文本内容
   *
   * @return {Object} meg - 消息体
   */
  genMsgText(content) {
    return {
      msgtype: 'text',
      'text': { content },
    };
  },

  /**
   * 生成图片消息体
   *
   * @param {String} media_id - 内容媒体ID
   *
   * @return {Object} meg - 消息体
   */
  genMsgImage(media_id) {
    return {
      'msgtype': 'image',
      'image': { media_id },
    };
  },

  /**
   * 生成语音消息体
   *
   * @param {String} media_id - 内容媒体ID
   * @param {Number} duration - 语音持续时间
   *
   * @return {Object} meg - 消息体
   */
  genMsgVoice(media_id, duration) {
    return {
      'msgtype': 'voice',
      'voice': { media_id, duration },
    };
  },

  /**
   * 生成文件消息体
   *
   * @param {String} media_id - 内容媒体ID
   *
   * @return {Object} meg - 消息体
   */
  genMsgFile(media_id) {
    return {
      'msgtype': 'file',
      'voice': { media_id },
    };
  },

  /**
   * 生成链接信息消息体
   *
   * @param {String} messageUrl - 消息链接地址
   * @param {String} title - 标题
   * @param {String} text - 内容
   * @param {String} picUrl - 图片媒体ID
   *
   * @return {Object} meg - 消息体
   */
  genMsgLink(messageUrl, title, text, picUrl) {
    return {
      'msgtype': 'link',
      'link': { messageUrl, picUrl, title, text },
    };
  },


  /**
   * 生成OA消息体
   *
   * @param {String} url - 消息链接地址
   * @param {Object} head - 头部
   * @param {Object} body - 消息体
   * @returns {Object} msg - 消息体
   */
  genMsgOA(url, head, body) {
    return {
      'msgtype': 'oa',
      'oa': { message_url: url, head, body },
    };
  },
  
};

module.exports = utils;

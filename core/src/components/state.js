/* @flow */

import _each from 'lodash/each';

export default class {

  _channelStorage: Object;
  _channelGroupStorage: Object;

  constructor() {
    this._channelStorage = {};
    this._channelGroupStorage = {};
  }

  containsChannel(name: string): boolean {
    return name in this._channelStorage;
  }

  containsChannelGroup(name: string): boolean {
    return name in this._channelGroupStorage;
  }

  getChannel(name: string): Object {
    return this._channelStorage[name];
  }

  getChannelGroup(name: string): Object {
    return this._channelGroupStorage[name];
  }

  addChannel(name: string, metadata: Object | number) {
    this._channelStorage[name] = metadata;
  }

  addChannelGroup(name: string, metadata: Object | number) {
    this._channelGroupStorage[name] = metadata;
  }

  /**
   * Generate Subscription Channel List
   * ==================================
   * generate_channel_list(channels_object);
   * nopresence (==include-presence) == false --> presence True
   */
  generate_channel_list(nopresence: boolean): Array<Object> {
    let list = [];
    _each(this._channelStorage, function (status, channel) {
      if (nopresence) {
        if (channel.search('-pnpres') < 0) {
          if (status.subscribed) list.push(channel);
        }
      } else {
        if (status.subscribed) list.push(channel);
      }
    });
    return list.sort();
  }

  /**
   * Generate Subscription Channel Groups List
   * ==================================
   * generate_channel_group_list(channels_groups object);
   */
  generate_channel_group_list(nopresence: boolean): Array<Object> {
    let list = [];
    _each(this._channelGroupStorage, function (status, channel_group) {
      if (nopresence) {
        if (channel_group.search('-pnpres') < 0) {
          if (status.subscribed) list.push(channel_group);
        }
      } else {
        if (status.subscribed) list.push(channel_group);
      }
    });
    return list.sort();
  }

}
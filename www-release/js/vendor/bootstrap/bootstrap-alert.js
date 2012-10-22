/* ==========================================================
 * bootstrap-alert.js v2.0.3
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

!function(e){var t='[data-dismiss="alert"]',n=function(n){e(n).on("click",t,this.close)};n.prototype.close=function(t){function n(){s.trigger("closed").remove()}var r=e(this),i=r.attr("data-target"),s;i||(i=r.attr("href"),i=i&&i.replace(/.*(?=#[^\s]*$)/,"")),s=e(i),t&&t.preventDefault(),s.length||(s=r.hasClass("alert")?r:r.parent()),s.trigger(t=e.Event("close"));if(t.isDefaultPrevented())return;s.removeClass("in"),e.support.transition&&s.hasClass("fade")?s.on(e.support.transition.end,n):n()},e.fn.alert=function(t){return this.each(function(){var r=e(this),i=r.data("alert");i||r.data("alert",i=new n(this)),typeof t=="string"&&i[t].call(r)})},e.fn.alert.Constructor=n,e(function(){e("body").on("click.alert.data-api",t,n.prototype.close)})}(window.jQuery)
/* ============================================================
 * bootstrap-dropdown.js v2.0.3
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
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
 * ============================================================ */

!function(e){function t(){e(n).parent().removeClass("open")}var n='[data-toggle="dropdown"]',r=function(t){var n=e(t).on("click.dropdown.data-api",this.toggle);e("html").on("click.dropdown.data-api",function(){n.parent().removeClass("open")})};r.prototype={constructor:r,toggle:function(n){var r=e(this),i,s,o;if(r.is(".disabled, :disabled"))return;return s=r.attr("data-target"),s||(s=r.attr("href"),s=s&&s.replace(/.*(?=#[^\s]*$)/,"")),i=e(s),i.length||(i=r.parent()),o=i.hasClass("open"),t(),o||i.toggleClass("open"),!1}},e.fn.dropdown=function(t){return this.each(function(){var n=e(this),i=n.data("dropdown");i||n.data("dropdown",i=new r(this)),typeof t=="string"&&i[t].call(n)})},e.fn.dropdown.Constructor=r,e(function(){e("html").on("click.dropdown.data-api",t),e("body").on("click.dropdown",".dropdown form",function(e){e.stopPropagation()}).on("click.dropdown.data-api",n,r.prototype.toggle)})}(window.jQuery)
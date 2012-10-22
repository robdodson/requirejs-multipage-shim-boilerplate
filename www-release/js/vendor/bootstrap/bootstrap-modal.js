/* =========================================================
 * bootstrap-modal.js v2.0.3
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
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
 * ========================================================= */

!function(e){function t(){var t=this,r=setTimeout(function(){t.$element.off(e.support.transition.end),n.call(t)},500);this.$element.one(e.support.transition.end,function(){clearTimeout(r),n.call(t)})}function n(e){this.$element.hide().trigger("hidden"),r.call(this)}function r(t){var n=this,r=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var s=e.support.transition&&r;this.$backdrop=e('<div class="modal-backdrop '+r+'" />').appendTo(document.body),this.options.backdrop!="static"&&this.$backdrop.click(e.proxy(this.hide,this)),s&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),s?this.$backdrop.one(e.support.transition.end,t):t()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),e.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(e.support.transition.end,e.proxy(i,this)):i.call(this)):t&&t()}function i(){this.$backdrop.remove(),this.$backdrop=null}function s(){var t=this;this.isShown&&this.options.keyboard?e(document).on("keyup.dismiss.modal",function(e){e.which==27&&t.hide()}):this.isShown||e(document).off("keyup.dismiss.modal")}var o=function(t,n){this.options=n,this.$element=e(t).delegate('[data-dismiss="modal"]',"click.dismiss.modal",e.proxy(this.hide,this))};o.prototype={constructor:o,toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var t=this,n=e.Event("show");this.$element.trigger(n);if(this.isShown||n.isDefaultPrevented())return;e("body").addClass("modal-open"),this.isShown=!0,s.call(this),r.call(this,function(){var n=e.support.transition&&t.$element.hasClass("fade");t.$element.parent().length||t.$element.appendTo(document.body),t.$element.show(),n&&t.$element[0].offsetWidth,t.$element.addClass("in"),n?t.$element.one(e.support.transition.end,function(){t.$element.trigger("shown")}):t.$element.trigger("shown")})},hide:function(r){r&&r.preventDefault();var i=this;r=e.Event("hide"),this.$element.trigger(r);if(!this.isShown||r.isDefaultPrevented())return;this.isShown=!1,e("body").removeClass("modal-open"),s.call(this),this.$element.removeClass("in"),e.support.transition&&this.$element.hasClass("fade")?t.call(this):n.call(this)}},e.fn.modal=function(t){return this.each(function(){var n=e(this),r=n.data("modal"),i=e.extend({},e.fn.modal.defaults,n.data(),typeof t=="object"&&t);r||n.data("modal",r=new o(this,i)),typeof t=="string"?r[t]():i.show&&r.show()})},e.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0},e.fn.modal.Constructor=o,e(function(){e("body").on("click.modal.data-api",'[data-toggle="modal"]',function(t){var n=e(this),r,i=e(n.attr("data-target")||(r=n.attr("href"))&&r.replace(/.*(?=#[^\s]+$)/,"")),s=i.data("modal")?"toggle":e.extend({},i.data(),n.data());t.preventDefault(),i.modal(s)})})}(window.jQuery)
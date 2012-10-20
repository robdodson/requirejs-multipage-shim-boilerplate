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
 * ========================================================= */!function(e){"use strict";function n(){var t=this,n=setTimeout(function(){t.$element.off(e.support.transition.end),r.call(t)},500);this.$element.one(e.support.transition.end,function(){clearTimeout(n),r.call(t)})}function r(e){this.$element.hide().trigger("hidden")}var t=function(t,n){this.options=n,this.$element=e(t).delegate('[data-dismiss="togglenav"]',"click.dismiss.togglenav",e.proxy(this.hide,this))};t.prototype={constructor:t,toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var t=this,n=e.Event("show");this.$element.trigger(n);if(this.isShown||n.isDefaultPrevented())return;this.isShown=!0,escape.call(this);var r=e.support.transition&&this.$element.hasClass("transition");this.$element.addClass("in")},hide:function(t){t&&t.preventDefault();var n=this;t=e.Event("hide"),this.$element.trigger(t);if(!this.isShown||t.isDefaultPrevented())return;this.isShown=!1,escape.call(this),this.$element.removeClass("in")}},e.fn.togglenav=function(n){return this.each(function(){var r=e(this),i=r.data("togglenav"),s=e.extend({},e.fn.modal.defaults,r.data(),typeof n=="object"&&n);i||r.data("togglenav",i=new t(this,s)),typeof n=="string"?i[n]():s.show&&i.show()})},e.fn.togglenav.defaults={backdrop:!0,keyboard:!0,show:!0},e.fn.togglenav.Constructor=t,e(function(){e("body").on("click.togglenav.data-api",'[data-toggle="togglenav"]',function(t){var n=e(this),r,i=e(n.attr("data-target")||(r=n.attr("href"))&&r.replace(/.*(?=#[^\s]+$)/,"")),s=i.data("togglenav")?"toggle":e.extend({},i.data(),n.data());t.preventDefault(),i.togglenav(s)})})}(window.jQuery);
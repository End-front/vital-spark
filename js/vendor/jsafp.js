/*jsl:option explicit*/
;(function(ns){
  // copyright 2013 rickluna.com
  // use permitted only for non-profit use
  // Configurable settings
  var _frames = 279;
  var _filePrefix = 'images/pacrim/pacific_rim';
  var _fileSuffix = '.jpg';
  var _interval = 33; // ms        
  var _frameNumOfDigits = 4;
  var _playOnLoadComplete = false;
  var _verbose = false;
  // ##########################################
  // do not configure below this line
  var _currFrame = 1;
  var _isDraggable = false;
  var _loadComplete = false;
  var _imgs = [];
  var _loadQuan = 0;
  var _wrprWidth, _wrprOffset, _handleWidth;
  var _onloadComplete = null;
  
  function _progress(){
      var perc = Math.round(_loadQuan / _frames * 100);
      $('#filmstrip_loadingWrapper').html(perc + ' %');
      if (perc === 100){
          $('#filmstrip_loadingWrapper').hide();
          _loadComplete = true;
          if (_playOnLoadComplete) _runAnimationToEnd();
          if (_onloadComplete) _onloadComplete();
      }
  }
  
  function _setupPreloadDisplay(){
      $('#filmstrip_loadingWrapper').css('height',parseInt($('#filmstrip_framesWrapper').css('height')) + 'px');
      $('#filmstrip_loadingWrapper').css('width',parseInt($('#filmstrip_framesWrapper').css('width')) + 'px');
      $('#filmstrip_loadingWrapper').css('line-height',parseInt($('#filmstrip_framesWrapper').css('height')) + 'px');
  }
  
  function _leftPadCurrFrame(num){
      var newStr = num ? num.toString() : _currFrame.toString();
      if (newStr.length < _frameNumOfDigits){
          for (var i=newStr.length;i<_frameNumOfDigits; i++){
              newStr = '0' + newStr;
          }
      }
      return newStr;
  }
  
  function _preloadImages(){
      for (var i=_currFrame;i<_frames;i++){
          _imgs[i] = new Image();
          _imgs[i].num = i;
          _imgs[i].onerror = function(){
              if (_verbose) console.log('image number ' + this.num + ' failed to load.')
          };
          _imgs[i].onload = function(){
              if (_verbose) console.log(this.num + ' has loaded'); 
              _loadQuan++;
              _progress();
          };
          _imgs[i].src = _filePrefix + _leftPadCurrFrame(i) + _fileSuffix;
      }
  }
  
  function _runAnimationToEnd(){
      if (_currFrame < _frames){
          window.setTimeout(function(){
              $('#filmstrip_frame').attr('src',_imgs[_currFrame].src);
              _currFrame++;
              _syncHandleToAnimationFirstRun();
              _runAnimationToEnd();
          },_interval);
      }
  }
  
  function _syncHandleToAnimationFirstRun(){
      var handle = $('#filmstrip_scrubberHandle').offset();
      var ratio = _wrprWidth / _frames;
      var newLeft = _currFrame * ratio - _handleWidth;
      $('#filmstrip_scrubberHandle').offset({top:handle.top,left:newLeft + _wrprOffset.left}); 
  }
  
  function _dragHandle(e){
      if (!_loadComplete){
          return;
      }
      if (e.type == 'mousedown'){
          _isDraggable = true;
          $('body').addClass('pointer');
          
      } else if (e.type == 'mouseup'){
          _isDraggable = false;
          $('body').removeClass('pointer');
          
      } else if (e.type == 'mousemove' && _isDraggable){
          var hndlOffset = $('#filmstrip_scrubberHandle').offset();
          if (e.pageX > _wrprOffset.left && e.pageX < (_wrprOffset.left + (_wrprWidth - _handleWidth))){
              $('#filmstrip_scrubberHandle').offset({top:hndlOffset.top,left:e.pageX});   
          }
          _syncFramesToHandle();
      }
      e.preventDefault();
  }
  
  function _cancelDrag(){
      _isDraggable = false;
      $('body').removeClass('pointer');
  }
  
  function _syncFramesToHandle(){
      var handle = $('#filmstrip_scrubberHandle').offset();
      var ratio = _wrprWidth / _frames;
      var frameRatio = Math.round((handle.left - _wrprOffset.left) / ratio);
      var newPath = _filePrefix + _leftPadCurrFrame(frameRatio === 0 ? 1 : frameRatio) + _fileSuffix;
      $('#filmstrip_frame').attr('src',_imgs[(frameRatio === 0 ? 1 : frameRatio)].src);
      _currFrame = frameRatio;
  }
  
  function _popGlobals(){
      _wrprWidth = parseInt($('#filmstrip_frameScrubber').css('width'),10);
      _wrprOffset = $('#filmstrip_frameScrubber').offset();
      _handleWidth = parseInt($('#filmstrip_scrubberHandle').css('width'),10);
  }
  
  function _load(cb){
      if (cb){
          _onloadComplete = cb;
      }
      $('#filmstrip_loadingWrapper').show();
      _currFrame = 1;
      _imgs.length = 0;
      _loadQuan = 0;
      $('#filmstrip_frame').attr('src',(_filePrefix + _leftPadCurrFrame(1) + _fileSuffix));
      _popGlobals();
      _setupPreloadDisplay();
      _preloadImages();
      $('#filmstrip_scrubberHandle').mousedown(_dragHandle);
      $('#filmstrip_scrubberHandle').mouseup(_dragHandle);
      $(document).mouseup(_cancelDrag);
      $(document).mousemove(_dragHandle);
      $(window).resize(_popGlobals);
  }
  
  // public
  
  ns.reload = function(cb){
      _load(cb);
  };
  
  ns.play = function(){
      _runAnimationToEnd();
  };
  
  ns.init = function(cb){
      _load(cb);
  }
  
})(this.jsafp = this.jsafp || {});



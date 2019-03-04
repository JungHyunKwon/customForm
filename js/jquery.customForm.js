/**
 * @author JungHyunKwon
 * @since 2017-12-06
 * @version 1.0.0
 */
try {
	(function($) {
		'use strict';

		//제이쿼리가 함수일 때
		if(typeof $ === 'function') {
			var _separator = ', ',
				_defaultText;

			/**
			 * @name customForm
			 * @param {string} method
			 * @param {string} value
			 * @return {jQuery || string || array [object {
			       $element : jQuery,
				   value : array [string] || string
			   }]}
			 */
			$.fn.customForm = function(method, value) {
				var methodIsString = typeof method === 'string',
					valueIsString = typeof value === 'string' && value,
					isMethod = method && methodIsString,
					hasValue = arguments.hasOwnProperty(1),
					result = [];

				this.each(function(index, element) {
					var $element = $(element);
					
					//클래스가 있을 때
					if($element.hasClass('custom_form')) {
						var $customText = $element.find('.custom_text:first'),
							$customItem = $element.find('.custom_item:first');

						//메서드일 때
						if(isMethod) {
							//새로고침
							if(method === 'refresh') {
								$customItem.triggerHandler('change.customForm');
							
							//소멸
							}else if(method === 'destroy') {
								$element.removeClass('focus active');
								$customItem.off('change.customForm focusin.customForm focusout.customForm customForm:getDefaultText.customForm customForm:setDefaultText.customForm');
								
							//포커스
							}else if(method === 'focus') {
								$customItem.focus();
							
							//초기화
							}else if(method === 'reset') {
								$customItem.val(($customItem.is('select[multiple]')) ? NaN : '');
								$element.customForm('refresh');
								
							//값
							}else if(method === 'val') {
								//값이 있을 때
								if(hasValue) {
									//문자일 때
									if(valueIsString) {
										$customItem.val(value);
										$element.customForm('refresh');
									}
								}else{
									result.push({
										$element : $element,
										value : $customItem.val() || ''
									});
								}

							//기본값
							}else if(method === 'defaultText') {
								//값이 있을 때
								if(hasValue) {
									//문자일 때
									if(valueIsString) {
										_defaultText = value;

										$customItem.triggerHandler('customForm:setDefaultText');
											
										$element.customForm('refresh');

										//초기화
										_defaultText = undefined;
									}
								}else{
									$customItem.triggerHandler('customForm:getDefaultText');

									result.push({
										$element : $element,
										value : _defaultText
									});

									//초기화
									_defaultText = undefined;
								}				
							}
						}else{
							var defaultText = $customText.text();

							//파괴
							$element.customForm('destroy');

							$customItem.on('change.customForm', function(event) {
								var tagName = this.tagName.toLowerCase(),
									type = this.type.toLowerCase(),
									text = [];

								//셀렉트일 때
								if(tagName === 'select') {
									var $selectedOption = $customItem.find('option:selected'),
										selectedOptionLength = $selectedOption.length;
										
									for(var i = 0; i < selectedOptionLength; i++) {
										text[i] = $selectedOption.eq(i).text();
									}

									text = text.join(_separator);

									//값이 없을 때
									if(!text) {
										text = defaultText;
									}

									//선택된 옵션이 있을 때
									if(selectedOptionLength) {
										$element.addClass('active');
									}else{
										$element.removeClass('active');
									}

									$customText.text(text);
								
								//인풋일 때
								}else if(tagName === 'input') {
									//체크박스일 때
									if(type === 'checkbox') {
										//체크되어 있을 때
										if(this.checked) {
											$element.addClass('active');
										}else{
											$element.removeClass('active');
										}			
									
									//라디오일 때
									}else if(type === 'radio') {
										var $customRadioItem = $('.custom_radio .custom_item');

										for(var i = 0, customRadioItemLength = $customRadioItem.length; i < customRadioItemLength; i++) {
											var $customRadio = $customRadioItem.eq(i).parents('.custom_radio');

											//체크되어 있을 때
											if($customRadioItem[i].checked) {
												$customRadio.addClass('active');
											}else{
												$customRadio.removeClass('active');
											}
										}
									
									//파일일 때
									}else if(type === 'file') {
										var files = this.files || this.value;

										//파일이 없을 때
										if(!files) {
											files = [];
										}

										//문자일 때
										if(typeof files === 'string') {
											files = [files];
										}
										
										var filesLength = files.length;

										for(var i = 0; i < filesLength; i++) {
											var file = files[i];

											text[i] = file.name || file;
										}

										text = text.join(_separator);

										//값이 없을 때
										if(!text) {
											text = defaultText;
										}

										$customText.text(text);
										
										//파일이 선택되어 있을 때
										if(filesLength) {
											$element.addClass('active');
										}else{
											$element.removeClass('active');
										}
									}
								}
							}).on('focusin.customForm', function(event) {
								$element.addClass('focus');
							}).on('focusout.customForm', function(event) {
								$element.removeClass('focus');
							}).on('customForm:getDefaultText.customForm', function(event) {
								_defaultText = defaultText;
							}).on('customForm:setDefaultText.customForm', function(event) {
								defaultText = _defaultText;
							});
							
							//새로고침
							$element.customForm('refresh');
						}
					}
				});
				
				var resultLength = result.length;

				//결과가 있을 때
				if(resultLength === 1) {
					result = result[0].value;
				
				//결과가 없을 때
				}else if(!resultLength) {
					result = this;
				}

				return result;
			};
		}else{
			throw '제이쿼리가 없습니다.';
		}
	})(window.jQuery);
}catch(e) {
	console.error(e);
}
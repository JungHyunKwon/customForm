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
				_separatorLength = _separator.length;

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
					valueIsString = typeof value === 'string',
					hasMethod = method && methodIsString,
					hasValue = arguments.hasOwnProperty(1),
					result = [];
				
				//문자일 때
				if(methodIsString) {
					method = method.toLowerCase();
				}

				this.each(function(index, element) {
					var $element = $(element);
					
					//클래스가 있을 때
					if($element.hasClass('custom_form')) {
						var data = $element.data(),
							$customText = $element.find('.custom_text'),
							$customItem = $element.find('.custom_item');
							
						//메서드일 때
						if(hasMethod) {
							var isGet = false,
								resultValue = {
									$element : $element
								};

							//새로고침
							if(method === 'refresh') {
								$customItem.triggerHandler('change.customForm');
							
							//소멸
							}else if(method === 'destroy') {
								delete data.customDefaultText;
								$element.removeClass('active');
								$customItem.off('change.customForm focusin.customForm focusout.customForm');
								
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
									isGet = true;
									resultValue.value = $customItem.val();
								}
							
							//기본값
							}else if(method === 'defaulttext') {
								//값이 있을 때
								if(hasValue) {
									//문자일 때
									if(valueIsString) {
										data.customDefaultText = value;
										$element.customForm('refresh');
									}
								}else{
									isGet = true;
									resultValue.value = data.customDefaultText;
								}						
							}
							
							//얻을 때
							if(isGet) {
								result.push(resultValue);
							}
						}else{
							//파괴
							$element.customForm('destroy');
						
							//기본값 입력
							data.customDefaultText = $customText.text();

							$customItem.on('change.customForm', function(event) {
								var tagName = this.tagName.toLowerCase(),
									type = this.type.toLowerCase(),
									text = '';

								//셀렉트일 때
								if(tagName === 'select') {
									var $selectedOption = $(this).find('option:selected'),
										selectedOptionLength = $selectedOption.length;

									for(var i = 0; i < selectedOptionLength; i++) {
										text += $selectedOption.eq(i).text() + _separator;
									}

									text = text.substring(0, text.length - _separatorLength);

									//값이 없을 때
									if(!text) {
										text = data.customDefaultText;
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

											text += (file.name || file) + _separator;
										}

										text = text.substring(0, text.length - _separatorLength);

										//값이 없을 때
										if(!text) {
											text = data.customDefaultText;
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
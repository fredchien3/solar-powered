@library_items.each do |library_item|
  json.set! library_item.id do
    json.partial! 'library_item', library_item: library_item
  end
end
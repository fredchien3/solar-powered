json.set! @library_item.id do
  json.partial! 'library_item', library_item: @library_item
end
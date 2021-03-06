class CreateArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :articles do |t|
      t.references :user, null: false, foreign_key: true
      t.string  :title, null: false
      t.boolean :is_publish
      t.datetime :publish_date, null: false
      t.string  :content, null: false
      t.integer :view_count
      t.string  :image

      t.timestamps
    end
  end
end

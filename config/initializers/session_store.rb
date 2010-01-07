# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_tufflife_session',
  :secret      => '3281d8932b36c866b9b8367e85553bd1fb49e8e00c77348d7efbc91f388e93eabe24d339ade64f9ef947bc510febff422f104d68e7e05b0c9d49f6654f3b05d7'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store

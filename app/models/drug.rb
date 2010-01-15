class Drug < Item

     def ingest(char)
      char.addstats(self)
      char.intoxicated=true
      char.intoxicated_at=Time.now
      char.intoxicated_term+=self.duration

  end
  
end

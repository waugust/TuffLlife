class Drug < Item

     def ingest(char)
    if self.kind == "Drug"
      char.addstats(self)
      char.intoxicated=true
      char.intoxicated_at=Time.now
      char.intoxicated_term+=self.duration
    end
  end
  
end

# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-persephone"
  spec.version       = "0.2.4"
  spec.authors       = ["erlzhang"]
  spec.email         = ["zhangshiyu1992@hotmail.com"]

  spec.summary       = "A minimal Jekyll theme."
  spec.homepage      = "https://github.com/erlzhang/jekyll-theme-persephone"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README)!i) }

  # spec.add_runtime_dependency "jekyll", "~> 3.5"

  # spec.add_development_dependency "bundler", "~> 1.16"
  # spec.add_development_dependency "rake", "~> 12.0"
end
